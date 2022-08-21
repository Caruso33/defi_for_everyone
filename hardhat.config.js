require("@nomicfoundation/hardhat-toolbox")

require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.6.12",
  networks: {
    hardhat: {
      chainId: 1337,
      forking: {
        url: process.env.REACT_APP_NETWORK_URL,
      },
    },
  },
}
