// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

/**
 * ███╗   ███╗ █████╗ ██████╗ ██████╗ ██╗   ██╗     ██████╗ ██████╗ ██╗███╗   ██╗
 * ████╗ ████║██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝    ██╔════╝██╔═══██╗██║████╗  ██║
 * ██╔████╔██║███████║██████╔╝██████╔╝ ╚████╔╝     ██║     ██║   ██║██║██╔██╗ ██║
 * ██║╚██╔╝██║██╔══██║██╔═══╝ ██╔═══╝   ╚██╔╝      ██║     ██║   ██║██║██║╚██╗██║
 * ██║ ╚═╝ ██║██║  ██║██║     ██║        ██║       ╚██████╗╚██████╔╝██║██║ ╚████║
 * ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝        ╚═╝        ╚═════╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝
 *
 * MAPPY COIN TOKENOMICS
 * 
 * - Max Supply: 1 Billion
 * - Name: MappyCoin
 * - Symbol: MAPPY
 * - Reflection to HODLers: 1%
 * - Automatic Buyback: 1%
 * - Anti Sniper Bot feature
 */

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router01.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

contract Mappy is Context, IERC20, Ownable, Pausable {
    using SafeERC20 for IERC20;
    using SafeMath for uint256;
    using Address for address;

    mapping (address => uint256) private _rOwned;
    mapping (address => uint256) private _tOwned;
    mapping (address => mapping (address => uint256)) private _allowances;
    mapping (address => uint256) private _addressLevel;
    
    mapping (address => bool) private _isExcludedFromFee;
    mapping (address => bool) private _isExcluded;
    address[] private _excluded;

    mapping (address => bool) private _isBot;
    address[] private _blockedBots;

    uint256 private constant MAX = ~uint256(0);
    uint256 private _tTotal;
    uint256 private _rTotal;
    uint256 private _tFeeTotal;

    string private _name = "MappyCoin";
    string private _symbol = "MAPPY";
    uint8 private _decimals = 18;
    
    address public constant DEAD = 0x000000000000000000000000000000000000dEaD; // Dead address
    address private constant ROUTER = 0x10ED43C718714eb63d5aA57B78B54704E256024E; // Pancakeswap Router

    uint256 public constant MAX_MINT = 1 * 10**8 * 10**18; // 100 Million MAPPY maximum
    uint256 public constant BASE_MINT = 1 * 10**5 * 10**18; // 0.1 Million MAPPY to mint per time
    
    uint256 public genesisReward;
    address public botKeeper; // bot keeper helps watch the price drop then pause the transfer function
    address public treasuryContract;

    uint8 private constant MAXTXFEE = 10;
    uint8 private constant MAXBUYBACKFEE = 10;

    uint8 private _taxFee = 0;
    uint8 private _previousTaxFee = _taxFee;

    uint8 private _buybackFee = 0;
    uint8 private _previousBuybackFee = _buybackFee;

    bool public antiDumpEnabled = true;
    bool public tradingEnabled = false;

    uint256 private tradingTime;

    event Deliver(address indexed sender, uint256 indexed amount);
    event GenesisRewardChanged(uint256 indexed previousAmount, uint256 indexed newAmount);
    event BotKeeperChanged(address indexed previousKeeper, address indexed newKeeper);
    event TreasuryContractChanged(address indexed previusAAddress, address indexed newAddress);
    event SwapAndLiquifyEnabledUpdated(bool enabled);
    event SwapAndLiquify(
        uint256 tokensSwapped,
        uint256 ethReceived,
        uint256 tokensIntoLiqudity
    );
    
    modifier lockTheSwap {
        inSwapAndLiquify = true;
        _;
        inSwapAndLiquify = false;
    }

    modifier onlyTreasury() {
        require(_msgSender() == treasuryContract, "Only Treasury");
        _;
    }
    
    IUniswapV2Router02 public immutable pcsV2Router;
    address public immutable pcsV2Pair;
    
    bool inSwapAndLiquify;
    bool public swapAndLiquifyEnabled = true;

    uint256 private buyBackUpperLimit = 1 * 10**18; // 1 BNB limit
    uint256 public numTokensSellToAddToBuyback = _tTotal.mul(1).div(10**3); // 0.1% of total supply
    
    constructor () {
        // 27% of max supply
        _tTotal = BASE_MINT * 10 * 27;
        _rTotal = ((MAX - (MAX % _tTotal)));

        _rOwned[msg.sender] = _rTotal;
        
        IUniswapV2Router02 _pcsV2Router = IUniswapV2Router02(ROUTER);
        
        // Create a pancakeswap pair for this new token
        pcsV2Pair = IUniswapV2Factory(_pcsV2Router.factory()).createPair(address(this), _pcsV2Router.WETH());

        // set the rest of the contract variables
        pcsV2Router = _pcsV2Router;
        
        _isExcludedFromFee[msg.sender] = true;
        _isExcludedFromFee[address(this)] = true;
        
        emit Transfer(address(0), msg.sender, _tTotal);
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

    function totalSupply() public view override returns (uint256) {
        return _tTotal;
    }

    function balanceOf(address account) public view override returns (uint256) {
        if (_isExcluded[account]) return _tOwned[account];

        return tokenFromReflection(_rOwned[account]);
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transfer(_msgSender(), recipient, amount);

        return true;
    }

    function allowance(address owner, address spender) public view override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public override returns (bool) {
        _approve(_msgSender(), spender, amount);

        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));

        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));

        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));

        return true;
    }

    function isGenesisAddress(address account) public view returns (bool) {
        return _addressLevel[account] == 0;
    }

    function genesisBalance(address account) public view returns (uint256) {
        if(isGenesisAddress(account)) {
          return genesisReward;
        }

        return 0;
    }

    function isExcludedFromReward(address account) public view returns (bool) {
        return _isExcluded[account];
    }

    function isExcludedFromFee(address account) public view returns(bool) {
        return _isExcludedFromFee[account];
    }

    function excludeFromFee(address account) public onlyOwner {
        _isExcludedFromFee[account] = true;
    }
    
    function includeInFee(address account) public onlyOwner {
        _isExcludedFromFee[account] = false;
    }

    function totalFees() public view returns (uint256) {
        return _tFeeTotal;
    }

    function mint(address _receiver, uint amount) public onlyTreasury {
        _mint(_receiver, amount);
    }

    function burn(uint amount) public onlyTreasury {
        _burn(amount);
    }

    function notifyGenesisAddresses(address[] memory _receivers, uint _value) public onlyOwner {
        for(uint i = 0; i < _receivers.length; i++){
            emit Transfer(address(0), _receivers[i], _value);
        }
    }

    function setGenesisReward(uint256 amount) public onlyOwner {
        require(amount <= totalSupply().div(1e11), "MAPPY_genesis: Genesis reward exceeds max reward."); // Genesis reward cannot be greater than 1e-11% of the total supply
        genesisReward = amount;

        emit GenesisRewardChanged(genesisReward, amount);
    }

    function setBotKeeper(address _newKeeper) public onlyOwner {
        botKeeper = _newKeeper;

        emit BotKeeperChanged(botKeeper, _newKeeper);
    }

    function setTreasuryAddress(address _newAddress) public onlyOwner {
        treasuryContract = _newAddress;

        emit TreasuryContractChanged(treasuryContract, _newAddress);
    }

    function setTransferStatus(bool _isPaused) public {
        require(msg.sender == botKeeper, "MAPPY_txCtrl: Caller is not bot keeper.");

        if(_isPaused){
            _pause();
        }else{
            _unpause();
        }
    }    

    function deliver(uint256 tAmount) public {
        address sender = _msgSender();
        require(!_isExcluded[sender], "MAPPY_rfi: Excluded addresses cannot call this function.");
        
        (uint256 rAmount,,,,,) = _getValues(tAmount);

        _rOwned[sender] = _rOwned[sender].sub(rAmount);
        _rTotal = _rTotal.sub(rAmount);

        _tFeeTotal = _tFeeTotal.add(tAmount);
        
        emit Deliver(sender, tAmount);
    }

    function reflectionFromToken(uint256 tAmount, bool deductTransferFee) public view returns(uint256) {
        require(tAmount <= _tTotal, "MAPPY_rfi: Amount must be less than supply.");

        if (!deductTransferFee) {
            (uint256 rAmount,,,,,) = _getValues(tAmount);

            return rAmount;
        } else {
            (,uint256 rTransferAmount,,,,) = _getValues(tAmount);

            return rTransferAmount;
        }
    }

    function tokenFromReflection(uint256 rAmount) public view returns(uint256) {
        require(rAmount <= _rTotal, "MAPPY_rfi: Amount must be less than total reflections.");

        uint256 currentRate =  _getRate();

        return rAmount.div(currentRate);
    }

    function excludeFromReward(address account) public onlyOwner() {
        require(!_isExcluded[account], "MAPPY_reward: Account is already excluded from reward.");

        if (_rOwned[account] > 0) {
            _tOwned[account] = tokenFromReflection(_rOwned[account]);
        }
        _isExcluded[account] = true;
        _excluded.push(account);
    }

    function includeInReward(address account) external onlyOwner() {
        require(_isExcluded[account], "MAPPY_reward: Account is already included in reward.");

        for (uint256 i = 0; i < _excluded.length; i++) {
            if (_excluded[i] == account) {
                _excluded[i] = _excluded[_excluded.length - 1];
                _tOwned[account] = 0;
                _isExcluded[account] = false;
                _excluded.pop();
                break;
            }
        }
    }
    
    function setAllFeePercent(uint8 taxFee, uint8 buybackFee) public onlyOwner() {
        require(taxFee >= 0 && taxFee <= MAXTXFEE,"MAPPY_fee: Transaction fee percentage error.");
        require(buybackFee >= 0 && buybackFee <= MAXBUYBACKFEE,"MAPPY_fee: BuyBack fee percentage error.");
        
        _taxFee = taxFee;
        _buybackFee = buybackFee;
    }
    
    function buyBackUpperLimitAmount() public view returns (uint256) {
        return buyBackUpperLimit;
    }

    function setBuybackUpperLimit(uint256 buyBackLimit) external onlyOwner() {
        buyBackUpperLimit = buyBackLimit * 10**18;
    }

    function setSwapAndLiquifyEnabled(bool _enabled) public onlyOwner {
        swapAndLiquifyEnabled = _enabled;

        emit SwapAndLiquifyEnabledUpdated(_enabled);
    }

    function setAntiDumpEnabled(bool enabled) public onlyOwner {
        antiDumpEnabled = enabled;
    }

    function _upgradeAddressLevel(address _account) private {
        _addressLevel[_account] = 1;
    }

    function _reflectFee(uint256 rFee, uint256 tFee) private {
        _rTotal = _rTotal.sub(rFee);
        _tFeeTotal = _tFeeTotal.add(tFee);
    }

    function _getValues(uint256 tAmount) private view returns (uint256, uint256, uint256, uint256, uint256, uint256) {
        (uint256 tTransferAmount, uint256 tFee, uint256 tBuyback) = _getTValues(tAmount);
        (uint256 rAmount, uint256 rTransferAmount, uint256 rFee) = _getRValues(tAmount, tFee, tBuyback, _getRate());

        return (rAmount, rTransferAmount, rFee, tTransferAmount, tFee, tBuyback);
    }

    function _getTValues(uint256 tAmount) private view returns (uint256, uint256, uint256) {
        uint256 tFee = calculateTaxFee(tAmount);
        uint256 tBuyback = calculateBuybackFee(tAmount);
        uint256 tTransferAmount = tAmount.sub(tFee).sub(tBuyback);

        return (tTransferAmount, tFee, tBuyback);
    }

    function _getRValues(uint256 tAmount, uint256 tFee, uint256 tBuyback, uint256 currentRate) private pure returns (uint256, uint256, uint256) {
        uint256 rAmount = tAmount.mul(currentRate);
        uint256 rFee = tFee.mul(currentRate);
        uint256 rBuyback = tBuyback.mul(currentRate);
        uint256 rTransferAmount = rAmount.sub(rFee).sub(rBuyback);

        return (rAmount, rTransferAmount, rFee);
    }

    function getRate() public view returns (uint256) {
        return _getRate();
    }

    function getTaxFee() public view returns (uint256) {
        return _taxFee;
    }

    function getBuybackFee() public view returns (uint256) {
        return _buybackFee;
    }

    function getCurrentRTSupply() public view returns (uint256, uint256) {
        return _getCurrentSupply();
    }

    function _getRate() private view returns(uint256) {
        (uint256 rSupply, uint256 tSupply) = _getCurrentSupply();
        
        return rSupply.div(tSupply);
    }

    function _getCurrentSupply() private view returns(uint256, uint256) {
        uint256 rSupply = _rTotal;
        uint256 tSupply = _tTotal;
        
        for (uint256 i = 0; i < _excluded.length; i++) {
            if (_rOwned[_excluded[i]] > rSupply || _tOwned[_excluded[i]] > tSupply) return (_rTotal, _tTotal);
            rSupply = rSupply.sub(_rOwned[_excluded[i]]);
            tSupply = tSupply.sub(_tOwned[_excluded[i]]);
        }
        
        if (rSupply < _rTotal.div(_tTotal)) return (_rTotal, _tTotal);

        return (rSupply, tSupply);
    }
    
    function _takeBuyback(uint256 tBuyback) private {
        uint256 currentRate =  _getRate();
        uint256 rBuyback = tBuyback.mul(currentRate);
        _rOwned[address(this)] = _rOwned[address(this)].add(rBuyback);
        
        if (_isExcluded[address(this)]) {
            _tOwned[address(this)] = _tOwned[address(this)].add(tBuyback);
        }
    }
    
    function calculateTaxFee(uint256 _amount) private view returns (uint256) {
        return _amount.mul(_taxFee).div(10**2);
    }

    function calculateBuybackFee(uint256 _amount) private view returns (uint256) {
        return _amount.mul(_buybackFee).div(10**2);
    }
    
    function removeAllFee() private {
        if (_taxFee == 0 && _buybackFee == 0) return;
        
        _previousTaxFee = _taxFee;
        _previousBuybackFee = _buybackFee;
        
        _taxFee = 0;
        _buybackFee = 0;
    }
    
    function restoreAllFee() private {
        _taxFee = _previousTaxFee;
        _buybackFee = _previousBuybackFee;
    }    

    function _approve(address owner, address spender, uint256 amount) private {
        require(owner != address(0), "ERC20: approve from zero address");
        require(spender != address(0), "ERC20: approve to zero address");

        _allowances[owner][spender] = amount;

        emit Approval(owner, spender, amount);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) private {
        require(from != address(0), "ERC20: transfer from zero address");
        require(to != address(0), "ERC20: transfer to zero address");
        require(amount > 0, "Transfer amount must be greater than zero");

        require(!_isBot[to], "MAPPY_antiBot: Bots can't do anything!");
        require(!_isBot[msg.sender], "MAPPY_antiBot: Bots can't do anything!");
        
        // Buy Txns
        if(from == pcsV2Pair && to != address(pcsV2Router) && !_isExcludedFromFee[to]) {
            require(tradingEnabled == true, "MAPPY_trading: Trading not yet enabled.");
            
            if (block.timestamp == tradingTime) {
                _isBot[to] = true;
                _blockedBots.push(to);
            }
        }
        
        uint256 contractTokenBalance = balanceOf(address(this));

        bool overMinTokenBalance = contractTokenBalance >= numTokensSellToAddToBuyback;
        if (!inSwapAndLiquify && to == pcsV2Pair && swapAndLiquifyEnabled) {
            if (overMinTokenBalance) {
                contractTokenBalance = numTokensSellToAddToBuyback;
                
                swapTokensForBNB(contractTokenBalance);
            }
            
            if (_buybackFee !=0) {
                uint256 balance = address(this).balance;
                if (balance > uint256(1 * 10**18)) {
                    if (balance > buyBackUpperLimit)
                        balance = buyBackUpperLimit;
                    
                    buyBackTokens(balance.div(100));
                }
            }
        }
        
        //indicates if fee should be deducted from transfer
        bool takeFee = true;
        
        //if any account belongs to _isExcludedFromFee account then remove the fee
        if (_isExcludedFromFee[from] || _isExcludedFromFee[to]) {
            takeFee = false;
        }
        
        //transfer amount, it will take buyback fee
        _tokenTransfer(from, to, amount, takeFee);
    }

    function buyBackTokens(uint256 amount) private lockTheSwap {
        if (amount > 0) {
            swapBNBForTokens(amount);
        }
    }

    function swapTokensForBNB(uint256 tokenAmount) private {
        // generate the uniswap pair path of token -> weth
        address[] memory path = new address[](2);
        path[0] = address(this);
        path[1] = pcsV2Router.WETH();

        _approve(address(this), address(pcsV2Router), tokenAmount);

        // make the swap
        pcsV2Router.swapExactTokensForETHSupportingFeeOnTransferTokens(
            tokenAmount,
            0, // accept any amount of ETH
            path,
            address(this),
            block.timestamp
        );
    }

    function swapBNBForTokens(uint256 amount) private {
        // generate the uniswap pair path of token -> weth
        address[] memory path = new address[](2);
        path[0] = pcsV2Router.WETH();
        path[1] = address(this);

        // make the swap
        pcsV2Router.swapExactETHForTokensSupportingFeeOnTransferTokens{value: amount}(
            0, // accept any amount of Tokens
            path,
            DEAD, // Burn address
            block.timestamp.add(300)
        );        
    }

    //this method is responsible for taking all fee, if takeFee is true
    function _tokenTransfer(address sender, address recipient, uint256 amount,bool takeFee) private {
        if (!takeFee)
            removeAllFee();
        
        if (_isExcluded[sender] && !_isExcluded[recipient]) {
            _transferFromExcluded(sender, recipient, amount);
        } else if (!_isExcluded[sender] && _isExcluded[recipient]) {
            _transferToExcluded(sender, recipient, amount);
        } else if (!_isExcluded[sender] && !_isExcluded[recipient]) {
            _transferStandard(sender, recipient, amount);
        } else if (_isExcluded[sender] && _isExcluded[recipient]) {
            _transferBothExcluded(sender, recipient, amount);
        } else {
            _transferStandard(sender, recipient, amount);
        }
        
        if (!takeFee)
            restoreAllFee();
    }

    function _transferStandard(address sender, address recipient, uint256 tAmount) private {
        (uint256 rAmount, uint256 rTransferAmount, uint256 rFee, uint256 tTransferAmount, uint256 tFee, uint256 tBuyback) = _getValues(tAmount);
        _rOwned[sender] = _rOwned[sender].sub(rAmount);
        _rOwned[recipient] = _rOwned[recipient].add(rTransferAmount);
        _takeBuyback(tBuyback);
        _reflectFee(rFee, tFee);

        emit Transfer(sender, recipient, tTransferAmount);
    }

    function _transferToExcluded(address sender, address recipient, uint256 tAmount) private {
        (uint256 rAmount, uint256 rTransferAmount, uint256 rFee, uint256 tTransferAmount, uint256 tFee, uint256 tBuyback) = _getValues(tAmount);
        _rOwned[sender] = _rOwned[sender].sub(rAmount);
        _tOwned[recipient] = _tOwned[recipient].add(tTransferAmount);
        _rOwned[recipient] = _rOwned[recipient].add(rTransferAmount);           
        _takeBuyback(tBuyback);
        _reflectFee(rFee, tFee);

        emit Transfer(sender, recipient, tTransferAmount);
    }

    function _transferFromExcluded(address sender, address recipient, uint256 tAmount) private {
        (uint256 rAmount, uint256 rTransferAmount, uint256 rFee, uint256 tTransferAmount, uint256 tFee, uint256 tBuyback) = _getValues(tAmount);
        _tOwned[sender] = _tOwned[sender].sub(tAmount);
        _rOwned[sender] = _rOwned[sender].sub(rAmount);
        _rOwned[recipient] = _rOwned[recipient].add(rTransferAmount);   
        _takeBuyback(tBuyback);
        _reflectFee(rFee, tFee);

        emit Transfer(sender, recipient, tTransferAmount);
    }

    function _transferBothExcluded(address sender, address recipient, uint256 tAmount) private {
        (uint256 rAmount, uint256 rTransferAmount, uint256 rFee, uint256 tTransferAmount, uint256 tFee, uint256 tBuyback) = _getValues(tAmount);
        _tOwned[sender] = _tOwned[sender].sub(tAmount);
        _rOwned[sender] = _rOwned[sender].sub(rAmount);
        _tOwned[recipient] = _tOwned[recipient].add(tTransferAmount);
        _rOwned[recipient] = _rOwned[recipient].add(rTransferAmount);        
        _takeBuyback(tBuyback);
        _reflectFee(rFee, tFee);

        emit Transfer(sender, recipient, tTransferAmount);
    }

    function _tokenTransferNoFee(address sender, address recipient, uint256 amount) private {
        uint256 currentRate =  _getRate();  
        uint256 rAmount = amount.mul(currentRate);   

        _rOwned[sender] = _rOwned[sender].sub(rAmount);
        _rOwned[recipient] = _rOwned[recipient].add(rAmount); 
        
        if (_isExcluded[sender]) {
            _tOwned[sender] = _tOwned[sender].sub(amount);
        } 
        if (_isExcluded[recipient]) {
            _tOwned[recipient] = _tOwned[recipient].add(amount);
        } 

        emit Transfer(sender, recipient, amount);
    }

    function isBlockedBot(address account) public view returns (bool) {
        return _isBot[account];
    }
    
    function blockedBot(address account) public onlyOwner() {
        require(account != ROUTER, 'MAPPY_antoBot: We can not blacklist swap router.');
        require(!_isBot[account], "MAPPY_antoBot: Account is already blacklisted.");

        _isBot[account] = true;
        _blockedBots.push(account);
    }

    function freeAccount(address account) public onlyOwner() {
        require(_isBot[account], "MAPPY_antoBot: Account is not blacklisted.");

        for (uint256 i = 0; i < _blockedBots.length; i++) {
            if (_blockedBots[i] == account) {
                _blockedBots[i] = _blockedBots[_blockedBots.length - 1];

                _isBot[account] = false;
                _blockedBots.pop();
                break;
            }
        }
    }

    function startTrading() public onlyOwner() {
        _taxFee = 1;
        _buybackFee = 1;

        tradingEnabled = true;
        tradingTime = block.timestamp;
    }

    function recoverBEP20(address tokenAddress, uint256 tokenAmount) public onlyOwner {
        // do not allow recovering self token
        require(tokenAddress != address(this), "Self withdraw");
        IERC20(tokenAddress).transfer(owner(), tokenAmount);
    }

    function _mint(address receiver, uint256 amount) private {
        require(amount + totalSupply() <= MAX_MINT, "MAPPY_mint: Cannot mint this amount. Exceeds max supply.");
        require(amount % BASE_MINT == 0, "MAPPY_mint: Cannot mint this amount.");

        uint256 _rate = _getRate();

        _tTotal = _tTotal.add(amount); // Increase tTotal
        _rTotal = _rTotal.add(amount.mul(_rate)); // rTotal should be increased as well

        _rOwned[receiver] = _rOwned[receiver].add(amount.mul(_rate));

        if(_isExcluded[receiver]){
            _tOwned[receiver] = _tOwned[receiver].add(amount);
        }

        emit Transfer(address(0), receiver, amount);
    }

    function _burn(uint256 amount) private {
        require(amount % BASE_MINT == 0, "MAPPY_burn: Cannot burn this amount.");

        address sender = _msgSender();

        uint256 _rate = _getRate();

        _tTotal = _tTotal.sub(amount); // Decrease tTotal
        _rTotal = _rTotal.sub(amount.mul(_rate)); // rTotal should be decreased as well

        _rOwned[sender] =  _rOwned[sender].sub(amount.mul(_rate));
        if(_isExcluded[sender]){
            _tOwned[sender] = _tOwned[sender].sub(amount);
        }

        emit Transfer(sender, address(0), amount);
    }

    //to recieve ETH from pcsV2Router when swaping
    receive() external payable {}
}