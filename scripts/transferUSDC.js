const IERC20 = require("../artifacts/contracts/IERC20.sol/IERC20.json")

async function transferUsdc(hre) {
  const { deployments, ethers, network, getNamedAccounts } = hre
  const { log } = deployments

  const usdcAddressProxy = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  const usdcOwner = "0xfcb19e6a322b27c06842a71e8c725399f049ae3a"

  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [usdcOwner],
  })

  const { deployer } = await getNamedAccounts()
  const signer = await ethers.getSigner()

  // attach logic to proxy
  //   const usdcContractLogic = new ethers.Contract(usdcAddressLogic, IERC20.abi, signer)
  const usdcContractLogic = new ethers.ContractFactory(IERC20.abi, IERC20.bytecode, signer)

  const usdcContractProxy = usdcContractLogic.attach(usdcAddressProxy)

  const ownerBalance = await usdcContractProxy.balanceOf(usdcOwner)
  let deployerBalance = await usdcContractProxy.balanceOf(deployer)
  log(
    "USDC Balance ownerBalance",
    ownerBalance.toString(),
    "deployerBalance",
    deployerBalance.toString()
  )

  const ethOwnerBalance = await ethers.provider.getBalance(usdcOwner)
  const ethDeployerBalance = await ethers.provider.getBalance(deployer)
  log(
    "Eth Balance, ownerBalance",
    ethers.utils.formatEther(ethOwnerBalance.toString()),
    "deployerBalance",
    ethers.utils.formatEther(ethDeployerBalance.toString())
  )

  const usdcOwnerSigner = await ethers.provider.getSigner(usdcOwner)
  await usdcContractProxy.connect(usdcOwnerSigner).transfer(deployer, ownerBalance.toNumber())
  deployerBalance = await usdcContractProxy.balanceOf(deployer)
  log("deployerBalance", deployerBalance.toString())

  log("USDC Transferred!")
  log("----------------------------------------------------------")
}

module.exports = transferUsdc
