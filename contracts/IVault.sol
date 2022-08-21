// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.12;

// import "@enzymefinance/contracts/release/core/fund/vault/IVault.sol";

interface IVault {
  /// @notice Gets the `accessor` variable
  /// @return accessor_ The `accessor` variable value
  function getAccessor() external view returns (address accessor_);
}
