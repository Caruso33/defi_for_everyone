import axios from "axios"
import { ETHPLORER_API_KEY } from "../utils/variables"

const ethplorer_api_url = "https://api.ethplorer.io/"

export function getTokenInfo(address) {
  return axios.get(ethplorer_api_url + "getTokenInfo/" + address + `?apiKey=${ETHPLORER_API_KEY}`)
}
