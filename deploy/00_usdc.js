const transferUsdc = require("../scripts/transferUSDC")

const usdcDeploy = async (hre) => {
  const { getNamedAccounts, deployments, network } = hre

  const { log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  // If we are on a local development network, we need to deploy mocks!
  if (+chainId === 1337) {
    log("Local network detected! Transfering usdc...")

    await transferUsdc(hre)
    log("----------------------------------------------------------")
  }
}

module.exports = usdcDeploy
usdcDeploy.tags = ["all", "usdc"]
