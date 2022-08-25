const IERC20 = require("../artifacts/contracts/IERC20.sol/IERC20.json")
const ComptrollerLib = require("../artifacts/contracts/ComptrollerLib.sol/ComptrollerLib.json")
const IVault = require("../artifacts/contracts/IVault.sol/IVault.json")
const { expect } = require("chai")
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

    usdcContractLogic = new ethers.ContractFactory(IERC20.abi, IERC20.bytecode, signer)
    usdcContractProxy = usdcContractLogic.attach(usdcAddressProxy)

    vaultLogic = new ethers.ContractFactory(IVault.abi, IVault.bytecode, signer)
    vaultProxy = vaultLogic.attach(vaultAddress)

    comptrollerAddress = await vaultProxy.getAccessor()

    comptrollerLogic = new ethers.ContractFactory(
      ComptrollerLib.abi,
      ComptrollerLib.bytecode,
      signer
    )
    comptrollerProxy = comptrollerLogic.attach(comptrollerAddress)
  })

  describe("buyShares", function () {
    it("can transfer shares", async () => {
      const address = await signer.getAddress()
      console.log("address", address)
      console.log(
        "balance",
        ethers.utils.formatEther((await ethers.provider.getBalance(address)).toString())
      )

      let usdcBalance = await usdcContractProxy.balanceOf(address)
      console.log("usdc before", usdcBalance.toString())

      const minSharesQuantities = 1
      await comptrollerProxy.buyShares([address], [usdcBalance.toNumber()], [minSharesQuantities])

      const usdcBalanceAfter = await usdcContractProxy.balanceOf(address)
      console.log("usdc after", usdcBalance.toString())

      const vaultBalance = await vaultProxy.balanceOf(address)
      console.log("vault token", vaultBalance.toString())

      expect(usdcBalanceAfter.toString()).to.equal("0")
    })
  })
})
