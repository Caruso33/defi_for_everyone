require("@nomicfoundation/hardhat-toolbox")
require("hardhat-deploy")
require("dotenv").config()

const transferUsdc = require("./scripts/transferUSDC")

task("transferUsdc", "Transfer usdc to local account").setAction(async (taskArgs, hre) => {
  transferUsdc(hre, taskArgs)
})

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{ version: "0.6.12" }, { version: "0.8.0" }],
  },
  networks: {
    mainnet: {
      url: process.env.REACT_APP_NETWORK_URL,
      accounts: {
        mnemonic: process.env.REACT_APP_MNEMONIC,
      },
    },
    hardhat: {
      chainId: 1337,
      forking: {
        url: process.env.REACT_APP_NETWORK_URL,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
}
