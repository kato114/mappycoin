// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0;

/**
 * @dev Interface of MappyTreasury contract.
 */
interface IMappyTreasury {
    function isAllowedGathering(address) external returns (bool);

    function gather(address) external returns (uint256);
}