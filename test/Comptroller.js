const IERC20 = require("../artifacts/contracts/IERC20.sol/IERC20.json")
const ComptrollerLibAbi = require("../contracts/ComptrollerLib.json")
const IVault = require("../artifacts/contracts/IVault.sol/IVault.json")
const { expect, assert } = require("chai")
const hre = require("hardhat")

const { ethers } = hre

describe("Comptroller", function () {
  const usdcAddressProxy = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  // const usdcOwner = "0xfcb19e6a322b27c06842a71e8c725399f049ae3a"
  const vaultAddress = "0xded69068a94776a23f5bdafc6b4c6894bc88e82c"
  let comptrollerAddress = ""

  let signer
  let usdcContractLogic, usdcContractProxy
  let vaultLogic, vaultProxy
  let comptrollerLogic, comptrollerProxy

  before(async () => {
    signer = await ethers.getSigner()

    // USDC Contract (needed as denominated currency)
    usdcContractLogic = new ethers.ContractFactory(IERC20.abi, IERC20.bytecode, signer)
    usdcContractProxy = usdcContractLogic.attach(usdcAddressProxy)

    // Enzyme Vault
    vaultLogic = new ethers.ContractFactory([...IVault.abi, ...IERC20.abi], IVault.bytecode, signer)
    vaultProxy = vaultLogic.attach(vaultAddress)

    // Enzyme Comptroller
    comptrollerAddress = await vaultProxy.getAccessor()

    comptrollerLogic = new ethers.ContractFactory(ComptrollerLibAbi, [], signer)
    comptrollerProxy = comptrollerLogic.attach(comptrollerAddress)
  })

  describe("buyShares", function () {
    it("can transfer shares", async () => {
      const address = await signer.getAddress()
      console.log("signer address", address)
      // console.log(
      //   "eth balance",
      //   ethers.utils.formatEther((await ethers.provider.getBalance(address)).toString())
      // )

      const usdcBalance = await usdcContractProxy.balanceOf(address)
      console.log("usdc balance before", usdcBalance.toString())
      assert(usdcBalance.toNumber() > 0, `No USDC Balance for signer account`)

      const success = await usdcContractProxy.approve(comptrollerAddress, usdcBalance.toNumber())
      assert(success)

      const allowance = await usdcContractProxy.allowance(address, comptrollerAddress)
      console.log("allowance", allowance.toString())
      assert(allowance.toNumber() === usdcBalance.toNumber(), "Allowance doesn't equal usdcBalance")

      const minSharesQuantities = 1
      await comptrollerProxy.buyShares(usdcBalance.toNumber(), minSharesQuantities)

      const vaultBalance = ethers.utils.formatUnits(
        (await vaultProxy.balanceOf(address)).toString(),
        18
      )
      console.log("Vault token shares", vaultBalance)
      assert(vaultBalance > 0)

      const usdcBalanceAfter = await usdcContractProxy.balanceOf(address)
      console.log("usdc balance after", usdcBalanceAfter.toString())
      expect(usdcBalanceAfter.toString()).to.equal("0")
    })
  })
})
