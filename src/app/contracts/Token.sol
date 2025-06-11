// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import 'lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol';

contract Token is ERC20 {
    constructor(string memory name_, string memory symbol_, uint256 initialSupply_) ERC20(name_, symbol_) {
        _mint(msg.sender, initialSupply_);
    }

    function create(uint256 amount) public {
        _mint(msg.sender, amount);
    }
}