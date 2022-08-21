// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.12;

contract IComptroller {
  ///////////////////
  // PARTICIPATION //
  ///////////////////

  // BUY SHARES

  /// @notice Buys shares on behalf of another user
  /// @param _buyer The account on behalf of whom to buy shares
  /// @param _investmentAmount The amount of the fund's denomination asset with which to buy shares
  /// @param _minSharesQuantity The minimum quantity of shares to buy
  /// @return sharesReceived_ The actual amount of shares received
  /// @dev This function is freely callable if there is no sharesActionTimelock set, but it is
  /// limited to a list of trusted callers otherwise, in order to prevent a griefing attack
  /// where the caller buys shares for a _buyer, thereby resetting their lastSharesBought value.
  function buySharesOnBehalf(
    address _buyer,
    uint256 _investmentAmount,
    uint256 _minSharesQuantity
  ) external returns (uint256 sharesReceived_) {}

  /// @notice Buys shares
  /// @param _investmentAmount The amount of the fund's denomination asset
  /// with which to buy shares
  /// @param _minSharesQuantity The minimum quantity of shares to buy
  /// @return sharesReceived_ The actual amount of shares received
  function buyShares(uint256 _investmentAmount, uint256 _minSharesQuantity)
    external
    returns (uint256 sharesReceived_)
  {}

  // REDEEM SHARES

  /// @notice Redeems a specified amount of the sender's shares for specified asset proportions
  /// @param _recipient The account that will receive the specified assets
  /// @param _sharesQuantity The quantity of shares to redeem
  /// @param _payoutAssets The assets to payout
  /// @param _payoutAssetPercentages The percentage of the owed amount to pay out in each asset
  /// @return payoutAmounts_ The amount of each asset paid out to the _recipient
  /// @dev Redeem all shares of the sender by setting _sharesQuantity to the max uint value.
  /// _payoutAssetPercentages must total exactly 100%. In order to specify less and forgo the
  /// remaining gav owed on the redeemed shares, pass in address(0) with the percentage to forego.
  /// Unlike redeemSharesInKind(), this function allows policies to run and prevent redemption.
  function redeemSharesForSpecificAssets(
    address _recipient,
    uint256 _sharesQuantity,
    address[] calldata _payoutAssets,
    uint256[] calldata _payoutAssetPercentages
  ) external returns (uint256[] memory payoutAmounts_) {}

  /// @notice Redeems a specified amount of the sender's shares
  /// for a proportionate slice of the vault's assets
  /// @param _recipient The account that will receive the proportionate slice of assets
  /// @param _sharesQuantity The quantity of shares to redeem
  /// @param _additionalAssets Additional (non-tracked) assets to claim
  /// @param _assetsToSkip Tracked assets to forfeit
  /// @return payoutAssets_ The assets paid out to the _recipient
  /// @return payoutAmounts_ The amount of each asset paid out to the _recipient
  /// @dev Redeem all shares of the sender by setting _sharesQuantity to the max uint value.
  /// Any claim to passed _assetsToSkip will be forfeited entirely. This should generally
  /// only be exercised if a bad asset is causing redemption to fail.
  /// This function should never fail without a way to bypass the failure, which is assured
  /// through two mechanisms:
  /// 1. The FeeManager is called with the try/catch pattern to assure that calls to it
  /// can never block redemption.
  /// 2. If a token fails upon transfer(), that token can be skipped (and its balance forfeited)
  /// by explicitly specifying _assetsToSkip.
  /// Because of these assurances, shares should always be redeemable, with the exception
  /// of the timelock period on shares actions that must be respected.
  function redeemSharesInKind(
    address _recipient,
    uint256 _sharesQuantity,
    address[] calldata _additionalAssets,
    address[] calldata _assetsToSkip
  ) external returns (address[] memory payoutAssets_, uint256[] memory payoutAmounts_) {}
}
