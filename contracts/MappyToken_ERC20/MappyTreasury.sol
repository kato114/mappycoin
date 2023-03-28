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
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IMappyToken.sol";

contract MappyTreasury is Ownable {

    address public mappyStakingManager;
    address public insuranceFund;
    IMappyToken public mappy;

    uint256 public maxMintAmount = 10*100000*10**18;

    modifier onlyCounterParty {
        require(mappyStakingManager == msg.sender || insuranceFund == msg.sender, "MAPPY_treasury: Not authorized.");
        _;
    }

    constructor (IMappyToken _mappy) {
        mappy = _mappy;
    }

    function myBalance() public view returns (uint256) {
        return mappy.balanceOf(address(this));
    }

    function mint(address recipient, uint256 amount) public onlyCounterParty {
        if(myBalance() < amount){
            mappy.mint(address(this), calulateMintAmount(amount));
        }

        mappy.treasuryTransfer(recipient, amount);
    }

    function burn(uint256 amount) public onlyOwner {
        mappy.burn(amount);
    }

    function setMappyStakingManager(address _newAddress) public onlyOwner {
        mappyStakingManager = _newAddress;
    }

    function setInsuranceFund(address _newAddress) public onlyOwner {
        insuranceFund = _newAddress;
    }

    function setMappy(IMappyToken _newMappy) public onlyOwner {
        mappy = _newMappy;
    }

    function setMaxMintAmount(uint256 amount) public onlyOwner {
        maxMintAmount = amount;
    }

    function calulateMintAmount(uint256 amount) private view returns (uint256 amountToMint) {
        uint256 baseAmount = mappy.BASE_MINT();

        amountToMint = baseAmount * (amount / baseAmount + 1);
        require(amountToMint < maxMintAmount, "MAPPY_treasury: Maximum amount exceed.");
    }

}