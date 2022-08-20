import { Flex } from "@chakra-ui/react"
import { useState } from "react"
// import { useSelector } from "react-redux"
// import { LOCAL_STORAGE_PREFERENCES_CID_KEY } from "variables/general.js"
// import { storeFilesToIPFS } from "../../../components/storage/save.js"
import CalculationFeedback from "./Wizard/CalculationFeedback.jsx"
import DisplayResults from "./Wizard/DisplayResults.jsx"
import Goals from "./Wizard/Goals.jsx"
import { Nav, StepWizardStyled, ValueToInvest } from "./Wizard/index.jsx"

export default function Assessment() {
  // const userAddress = useSelector((user) => user.address)

  const [assessmentState, setAssessmentState] = useState({
    walletValueETH: null,
    valueToInvest: null,
    valueGoal: null,
    valueRiskProfile: null,
    valueMarketReaction: null,
    valueVaultChoice: null,
  })

  const [vaultData, setVaultData] = useState([])

  const onValueChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value })

  const onValueSliderChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value })

  // function storeAssessmentToIPFS() {
  //   storeFilesToIPFS(`${userAddress}_pref.txt`, JSON.stringify(assessmentState))
  //     .then((cid) => {
  //       if (cid) {
  //         localStorage[LOCAL_STORAGE_PREFERENCES_CID_KEY] = cid
  //         console.log("wrote to IPFS", cid)
  //         console.log(`read file on https://${cid}.ipfs.dweb.link`)
  //       }
  //     })
  //     .catch((e) => console.error(e.message))
  // }

  return (
    <Flex pt={{ base: "120px", md: "75px" }}>
      <StepWizardStyled nav={<Nav />}>
        <ValueToInvest state={{ ...assessmentState, onValueSliderChange }} />

        <Goals
          state={{ ...assessmentState, onValueSliderChange, onValueChange }}
        />

        <CalculationFeedback
          state={assessmentState}
          vaults={{ vaultData, setVaultData }}
          // storeAssessmentToIPFS={storeAssessmentToIPFS}
        />

        <DisplayResults
          state={{ ...assessmentState, onValueChange }}
          vaults={vaultData}
        />
      </StepWizardStyled>
    </Flex>
  )
}
