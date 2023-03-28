// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 *  Based on Sushi SushiBar:
 *  https://github.com/sushiswap/sushiswap/blob/1e4db47fa313f84cd242e17a4972ec1e9755609a/contracts/SushiBar.sol
 */

// This contract handles swapping to and from MappyX, DfxSwap's staking token.
contract DfxStaking is ERC20("MappyX Staked", "MappyX") {
    using SafeMath for uint256;
    IERC20 public mappy;

    // Define the MAPPY token contract
    constructor(IERC20 _mappy) public {
        mappy = _mappy;
    }

    // Enter the DfxStaking. Pay some MAPPYs. Earn some shares.
    // Locks MAPPY and mints MappyX
    function enter(uint256 _amount) public {
        // Gets the amount of MAPPY locked in the contract
        uint256 totalDfx = mappy.balanceOf(address(this));
        // Gets the amount of MappyX in existence
        uint256 totalShares = totalSupply();
        // If no MappyX exists, mint it 1:1 to the amount put in
        if (totalShares == 0 || totalDfx == 0) {
            _mint(msg.sender, _amount);
        } 
        // Calculate and mint the amount of MappyX the MAPPY is worth. The ratio will change overtime, as MappyX is burned/minted and MAPPY deposited + gained from fees / withdrawn.
        else {
            uint256 what = _amount.mul(totalShares).div(totalDfx);
            _mint(msg.sender, what);
        }
        // Lock the MAPPY in the contract
        mappy.transferFrom(msg.sender, address(this), _amount);
    }

    // Leave the DfxStaking. Claim back your MAPPYs.
    // Unlocks the staked + gained MAPPY and burns MappyX
    function leave(uint256 _share) public {
        // Gets the amount of MappyX in existence
        uint256 totalShares = totalSupply();
        // Calculates the amount of MAPPY the MappyX is worth
        uint256 what = _share.mul(mappy.balanceOf(address(this))).div(totalShares);
        _burn(msg.sender, _share);
        mappy.transfer(msg.sender, what);
    }
}