import { Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { LOCAL_STORAGE_PREFERENCES_CID_KEY } from "variables/general.js"
import { retrieveFilesFromIPFS, storeFilesToIPFS } from "../../../api/web3storage.js"
import CalculationFeedback from "./Wizard/CalculationFeedback.jsx"
import DisplayResults from "./Wizard/DisplayResults.jsx"
import Goals from "./Wizard/Goals.jsx"
import { Nav, StepWizardStyled, ValueToInvest } from "./Wizard/index.jsx"

export default function Assessment() {
  const userAddress = useSelector((state) => state.user.address)
  const userNativeBalance = useSelector((state) => state.user.nativeBalance)

  const [prevPref, setPrevPref] = useState([])
  const [assessmentState, setAssessmentState] = useState({
    walletValueETH: null,
    valueToInvest: 0,
    valueGoal: null,
    valueRiskProfile: null,
    valueMarketReaction: null,
    valueVaultChoice: null,
  })

  useEffect(() => {
    async function getPrevPref() {
      async function readAssementFromIPFS() {
        if (assessmentState.valueToInvest) return

        const cid = localStorage.getItem(LOCAL_STORAGE_PREFERENCES_CID_KEY)
        if (cid) {
          console.log("Reading preference from IPFS", cid)

          try {
            const files = await retrieveFilesFromIPFS(cid)

            if (files.length > 0) {
              const content = await files[0].text()

              return JSON.parse(content)
            }
          } catch (e) {
            console.error(e.message)
          }
        }
      }

      const lastPreferences = await readAssementFromIPFS()
      if (lastPreferences) {
        setPrevPref(lastPreferences)

        const lastPref = lastPreferences[lastPreferences.length - 1]

        setAssessmentState({
          valueToInvest: lastPref.valueToInvest,
          valueGoal: lastPref.valueGoal,
          valueRiskProfile: lastPref.valueRiskProfile,
        })
      }
    }

    getPrevPref()
  }, [assessmentState.valueToInvest])

  useEffect(() => {
    if (userNativeBalance && assessmentState.walletValueETH === null) {
      setAssessmentState({
        ...assessmentState,
        walletValueETH: userNativeBalance,
      })
    }
  }, [assessmentState, userNativeBalance])

  const [vaultData, setVaultData] = useState([])

  const onValueChange = (key, value) => setAssessmentState({ ...assessmentState, [key]: value })

  const onValueSliderChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value })

  async function storeAssessmentToIPFS() {
    try {
      const cid = await storeFilesToIPFS(
        `${userAddress}_pref.json`,
        JSON.stringify([...prevPref, assessmentState])
      )

      if (cid) {
        localStorage.setItem(LOCAL_STORAGE_PREFERENCES_CID_KEY, cid)
        console.log("Wrote preference to IPFS", cid)
        console.log(`read file on https://${cid}.ipfs.dweb.link`)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <Flex pt={{ base: "120px", md: "75px" }}>
      <StepWizardStyled nav={<Nav />}>
        <ValueToInvest state={{ ...assessmentState, onValueSliderChange }} />

        <Goals state={{ ...assessmentState, onValueSliderChange, onValueChange }} />

        <CalculationFeedback
          state={assessmentState}
          vaults={{ vaultData, setVaultData }}
          storeAssessmentToIPFS={storeAssessmentToIPFS}
        />

        <DisplayResults state={{ ...assessmentState, onValueChange }} vaults={vaultData} />
      </StepWizardStyled>
    </Flex>
  )
}
