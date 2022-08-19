const { default: axios } = require("axios")
const { ETHPLORER_API_KEY } = require("variables/general")

const ethplorer_api_url = "https://api.ethplorer.io/"

export function getTokenInfo(address) {
  return axios.get(
    ethplorer_api_url +
      "getTokenInfo/" +
      address +
      `?apiKey=${ETHPLORER_API_KEY}`
  )
}
