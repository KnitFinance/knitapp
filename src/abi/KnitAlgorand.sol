// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "./MinterLimit.sol";

contract KnitAlgorand is ERC20, ERC20Burnable, Ownable, MinterLimit {

  constructor() public ERC20("Knit Algorand", "kALGO") {}

  function mint(address to, uint256 amount) public {
    require(minters[msg.sender], "No permission for minting");
    uint256 minterBalance = mintersLimit[msg.sender];
    require(minterBalance >= amount, "Minting limit exceeded");
    mintersLimit[msg.sender] = minterBalance - amount;

    minted[msg.sender] += amount;
    _mint(to, amount);
  }
}
