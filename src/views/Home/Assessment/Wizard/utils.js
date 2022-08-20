import * as vaultData from "../../vault_data.json"

export function calculateRiskProfile(state) {
  if (state.valueRiskProfile === null) {
    throw Error("Goal is not set")
  }

  const riskProfile = state.valueRiskProfile

  return riskProfile
}

export function getVaults(_riskProfile) {
  console.dir(vaultData)
  return vaultData//.map((vault) => vault)
}
