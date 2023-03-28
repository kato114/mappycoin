// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IReservoir.sol";

/**
 *  Based on Sushi MasterChef:
 *  https://github.com/sushiswap/sushiswap/blob/1e4db47fa313f84cd242e17a4972ec1e9755609a/contracts/MasterChef.sol
 *
 *  XXX: Removed migration logic;
 *  XXX: Removed token minting and added token reservoir;
 *  XXX: Added check if LP token has already been added;
 *  XXX: Owner can update reservoir address and mappyPerBlock value;
 *  XXX: Removed bonus multiplier;
 *  XXX: Added defiController function to claim profit;
 *  XXX: Use 1e18 instead of 1e12 for accumulated tokens per share.
 */

contract MappyFarmingPool is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount;     // How many LP tokens the user has provided.
        uint256 rewardDebt; // Reward debt. See explanation below.
        //
        // We do some fancy math here. Basically, any point in time, the amount of MAPPYs
        // entitled to a user but is pending to be distributed is:
        //
        //   pending reward = (user.amount * pool.accMappyPerShare) - user.rewardDebt
        //
        // Whenever a user deposits or withdraws LP tokens to a pool. Here's what happens:
        //   1. The pool's `accMappyPerShare` (and `lastRewardBlock`) gets updated.
        //   2. User receives the pending reward sent to his/her address.
        //   3. User's `amount` gets updated.
        //   4. User's `rewardDebt` gets updated.
    }

    // Info of each pool.
    struct PoolInfo {
        IERC20 lpToken;           // Address of LP token contract.
        uint256 allocPoint;       // How many allocation points assigned to this pool. MAPPYs to distribute per block.
        uint256 lastRewardBlock;  // Last block number that MAPPYs distribution occurs.
        uint256 accMappyPerShare;   // Accumulated MAPPYs per share, times 1e18. See below.
    }

    // The MAPPY TOKEN!
    IERC20 public mappy;
    // Dev address.
    address public devaddr;
    // MAPPY tokens created per block.
    uint256 public mappyPerBlock;

    // Info of each pool.
    PoolInfo[] public poolInfo;
    // Info of each user that stakes LP tokens.
    mapping (uint256 => mapping(address => UserInfo)) public userInfo;
    // Total allocation points. Must be the sum of all allocation points in all pools.
    uint256 public totalAllocPoint = 0;
    // The block number when MAPPY mining starts.
    uint256 public startBlock;

    // XXX: token reservoir.
    IReservoir public mappyReservoir;

    // XXX: allow to claim profit from tokenized startegy.
    address public defiController;

    // XXX: checking already added LP tokens.
    mapping(address => bool) private lpTokens;

    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 indexed pid, uint256 amount);

    event SetMappyReservoir(address reservoir); // XXX: set reservoir event
    event SetMappyPerBlock(uint256 mappyPerBlock); // XXX: set mappyPerBlock event
    event SetDefiController(address defiController); // XXX: set defiController event

    constructor(
        IERC20 _mappy,
        address _devaddr,
        address _defiController,
        uint256 _mappyPerBlock,
        uint256 _startBlock
    ) public {
        mappy = _mappy;
        devaddr = _devaddr;
        defiController = _defiController;
        mappyPerBlock = _mappyPerBlock;
        startBlock = _startBlock;
    }

    function poolLength() external view returns (uint256) {
        return poolInfo.length;
    }

    // Add a new lp to the pool. Can only be called by the owner.
    function add(uint256 _allocPoint, IERC20 _lpToken, bool _withUpdate) public onlyOwner {
        // XXX: trying to add the same LP token more than once
        require(!lpTokens[address(_lpToken)], "MappyFarmingPool: LP token has already been added");
        lpTokens[address(_lpToken)] = true;

        if (_withUpdate) {
            massUpdatePools();
        }
        uint256 lastRewardBlock = block.number > startBlock ? block.number : startBlock;
        totalAllocPoint = totalAllocPoint.add(_allocPoint);
        poolInfo.push(PoolInfo({
            lpToken: _lpToken,
            allocPoint: _allocPoint,
            lastRewardBlock: lastRewardBlock,
            accMappyPerShare: 0
        }));
    }

    // Update the given pool's MAPPY allocation point. Can only be called by the owner.
    function set(uint256 _pid, uint256 _allocPoint, bool _withUpdate) public onlyOwner {
        if (_withUpdate) {
            massUpdatePools();
        }
        totalAllocPoint = totalAllocPoint.sub(poolInfo[_pid].allocPoint).add(_allocPoint);
        poolInfo[_pid].allocPoint = _allocPoint;
    }

    // XXX: set mappyReservoir. Can only be called by the owner.
    function setMappyReservoir(IReservoir _mappyReservoir) public onlyOwner {
        mappyReservoir = _mappyReservoir;
        emit SetMappyReservoir(address(_mappyReservoir));
    }

    // XXX: set mappyPerBlock. Can only be called by the owner.
    function setMappyPerBlock(uint256 _mappyPerBlock) public onlyOwner {
        mappyPerBlock = _mappyPerBlock;
        emit SetMappyPerBlock(_mappyPerBlock);
    }

    // XXX: set defiController. Can only be called by the owner.
    function setDefiController(address _defiController) public onlyOwner {
        defiController = _defiController;
        emit SetDefiController(_defiController);
    }

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to) public pure returns (uint256) {
        return _to.sub(_from);
    }

    // View function to see pending MAPPYs on frontend.
    function pendingMappy(uint256 _pid, address _user) external view returns (uint256) {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][_user];
        uint256 accMappyPerShare = pool.accMappyPerShare;
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (block.number > pool.lastRewardBlock && lpSupply != 0) {
            uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
            uint256 mappyReward = multiplier.mul(mappyPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
            mappyReward = availableMappy(mappyReward); // XXX: amount available for transfer
            mappyReward = mappyReward.sub(mappyReward.div(10)); // XXX: subtract tokens for dev
            accMappyPerShare = accMappyPerShare.add(mappyReward.mul(1e18).div(lpSupply));
        }
        return user.amount.mul(accMappyPerShare).div(1e18).sub(user.rewardDebt);
    }

    // Update reward variables for all pools. Be careful of gas spending!
    function massUpdatePools() public {
        uint256 length = poolInfo.length;
        for (uint256 pid = 0; pid < length; ++pid) {
            updatePool(pid);
        }
    }

    // Update reward variables of the given pool to be up-to-date.
    function updatePool(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        if (block.number <= pool.lastRewardBlock) {
            return;
        }
        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = getMultiplier(pool.lastRewardBlock, block.number);
        uint256 mappyReward = multiplier.mul(mappyPerBlock).mul(pool.allocPoint).div(totalAllocPoint);
        mappyReward = mappyReservoir.drip(mappyReward); // XXX: transfer tokens from mappyReservoir
        mappy.transfer(devaddr, mappyReward.div(10)); // XXX: transfer tokens to devaddr
        mappyReward = mappyReward.sub(mappyReward.div(10)); // XXX: subtract tokens for dev
        pool.accMappyPerShare = pool.accMappyPerShare.add(mappyReward.mul(1e18).div(lpSupply));
        pool.lastRewardBlock = block.number;
    }

    // Deposit LP tokens to MappyFarmingPool for MAPPY allocation.
    function deposit(uint256 _pid, uint256 _amount) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        updatePool(_pid);
        if (user.amount > 0) {
            uint256 pending = user.amount.mul(pool.accMappyPerShare).div(1e18).sub(user.rewardDebt);
            if(pending > 0) {
                safeMappyTransfer(msg.sender, pending);
            }
        }
        if(_amount > 0) {
            pool.lpToken.safeTransferFrom(address(msg.sender), address(this), _amount);
            user.amount = user.amount.add(_amount);
        }
        user.rewardDebt = user.amount.mul(pool.accMappyPerShare).div(1e18);
        emit Deposit(msg.sender, _pid, _amount);
    }

    // Withdraw LP tokens from MappyFarmingPool.
    function withdraw(uint256 _pid, uint256 _amount) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        require(user.amount >= _amount, "withdraw: not good");
        updatePool(_pid);
        uint256 pending = user.amount.mul(pool.accMappyPerShare).div(1e18).sub(user.rewardDebt);
        if(pending > 0) {
            safeMappyTransfer(msg.sender, pending);
        }
        if(_amount > 0) {
            user.amount = user.amount.sub(_amount);
            pool.lpToken.safeTransfer(address(msg.sender), _amount);
        }
        user.rewardDebt = user.amount.mul(pool.accMappyPerShare).div(1e18);
        emit Withdraw(msg.sender, _pid, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) public {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        uint256 amount = user.amount;
        user.amount = 0;
        user.rewardDebt = 0;
        pool.lpToken.safeTransfer(address(msg.sender), amount);
        emit EmergencyWithdraw(msg.sender, _pid, amount);
    }

    // Update dev address by the previous dev.
    function updateDev(address _devaddr) public {
        require(msg.sender == devaddr, "updateDev: permission denied");
        devaddr = _devaddr;
    }

    // XXX: return available MAPPYs on mappyReservoir.
    function availableMappy(uint256 requestedTokens) internal view returns (uint256) {
        uint256 reservoirBalance = mappy.balanceOf(address(mappyReservoir));
        uint256 mappyAvailable = (requestedTokens > reservoirBalance)
            ? reservoirBalance
            : requestedTokens;

        return mappyAvailable;
    }

    // Safe mappy transfer function, just in case if rounding error causes pool to not have enough MAPPYs.
    function safeMappyTransfer(address _to, uint256 _amount) internal {
        uint256 mappyBal = mappy.balanceOf(address(this));
        if (_amount > mappyBal) {
            mappy.transfer(_to, mappyBal);
        } else {
            mappy.transfer(_to, _amount);
        }
    }
}