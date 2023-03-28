// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./interfaces/IMappyTreasury.sol";

contract HFarmingPoolV2 is Ownable {
    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    // Info of each user.
    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
    }

    IERC20 public mappyDepositAsset;
    IERC20 public mappyRewardAsset;
    
    mapping (address => UserInfo) public userInfo;

    IMappyTreasury public mappyTreasury;

    uint256 totalAddedRewards;
    uint256 totalVirtualRewards;
    uint256 totalDeposit;
    bool bOnlyHuman;

    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 amount);

    constructor(
        IERC20 _mappyRewardAsset,
        IERC20 _mappyDepositAsset
    ) public {
        mappyRewardAsset = _mappyRewardAsset;
        mappyDepositAsset = _mappyDepositAsset;
        bOnlyHuman = true;
    }

    modifier onlyHuman() {
        if (bOnlyHuman) require(msg.sender == tx.origin, "!human");
        _;
    }

    // XXX: set mappyRewardAssetReservoir. Can only be called by the owner.
    function setMappyTreasury(IMappyTreasury _mappyTreasury) public onlyOwner {
        mappyTreasury = _mappyTreasury;
    }

    function setOnlyHumanFlag(bool bEnable) onlyOwner public {
        bOnlyHuman = bEnable;
    }

    // View function to see pending MAPPYs on frontend.
    function pendingReward(address _user) external returns (uint256) {
        checkTreasury();

        UserInfo storage user = userInfo[_user];
        if (totalDeposit == 0) return 0;
        return totalVirtualRewards.mul(user.amount).div(totalDeposit).sub(user.rewardDebt);
    }

    // Deposit LP tokens to MappyFarmingPool for MAPPY allocation.
    function deposit(uint256 _amount) onlyHuman public {
        require(msg.sender == tx.origin, "!human");

        UserInfo storage user = userInfo[msg.sender];

        checkTreasury();
 
        if (user.amount > 0) {
            uint256 pending = rawPendingMappy(user);
            if(pending > 0) {
                safeMappyTransfer(msg.sender, pending);
            }
        }
        if(_amount > 0) {
            mappyDepositAsset.safeTransferFrom(address(msg.sender), address(this), _amount);
            uint256 _old_totalDeposit = totalDeposit; 
            totalDeposit = _old_totalDeposit.add(_amount);
            if (_old_totalDeposit > 0) {
                totalVirtualRewards = totalVirtualRewards.mul(_old_totalDeposit.add(_amount)).div(_old_totalDeposit); // TODO: check calculations
            }
            user.amount = user.amount.add(_amount);
        }
        user.rewardDebt = totalVirtualRewards.mul(user.amount).div(totalDeposit);
        emit Deposit(msg.sender, _amount);
    }

    // Withdraw LP tokens from MappyFarmingPool.
    function withdraw(uint256 _amount) onlyHuman public returns(uint256 _userPendingReward) {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= _amount, "withdraw: not good");

        checkTreasury();

        _userPendingReward = rawPendingMappy(user);
        if(_userPendingReward > 0) {
            safeMappyTransfer(msg.sender, _userPendingReward);
        }

        if(_amount > 0) {
            uint256 _old_totalDeposit = totalDeposit;
            user.amount = user.amount.sub(_amount);
            totalDeposit = _old_totalDeposit.sub(_amount);

            totalVirtualRewards = totalVirtualRewards.mul(_old_totalDeposit.sub(_amount)).div(_old_totalDeposit); // TODO: check calculations

            mappyDepositAsset.safeTransfer(address(msg.sender), _amount);
        }

        user.rewardDebt = totalVirtualRewards.mul(user.amount).div(totalDeposit);
        emit Withdraw(msg.sender, _amount);
    }

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw() onlyHuman public {
        UserInfo storage user = userInfo[msg.sender];
        uint256 amount = user.amount;
        user.amount = 0;
        user.rewardDebt = 0;
        uint256 _old_totalDeposit = totalDeposit;
        totalDeposit = _old_totalDeposit.sub(amount);
        totalVirtualRewards = totalVirtualRewards.mul(_old_totalDeposit.sub(amount)).div(_old_totalDeposit); // TODO: check calculations
        mappyDepositAsset.safeTransfer(address(msg.sender), amount);
        emit EmergencyWithdraw(msg.sender, amount);
    }

    // Safe mappyRewardAsset transfer function, just in case if rounding error causes pool to not have enough MAPPYs.
    function safeMappyTransfer(address _to, uint256 _amount) internal {
        uint256 mappyRewardAssetBal = mappyRewardAsset.balanceOf(address(this));
        if (_amount > mappyRewardAssetBal) _amount = mappyRewardAssetBal;

        mappyRewardAsset.transfer(_to, _amount);
        totalAddedRewards = totalAddedRewards.sub(_amount);
    }

    function checkTreasury() internal {
        if (mappyTreasury.isAllowedGathering(address(this))) {
            mappyTreasury.gather(address(this));
        }

        uint256 bal = mappyRewardAsset.balanceOf(address(this));
        if (bal > totalAddedRewards) {
            totalVirtualRewards = totalVirtualRewards.add(bal - totalAddedRewards);
            totalAddedRewards = bal;
        }
    }

    function rawPendingMappy(UserInfo storage user) internal view returns (uint256) {
        if (totalDeposit == 0) return 0;
        return totalVirtualRewards.mul(user.amount).div(totalDeposit).sub(user.rewardDebt);
    }
}