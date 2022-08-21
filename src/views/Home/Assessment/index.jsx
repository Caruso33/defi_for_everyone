import { Flex } from "@chakra-ui/react"
import { ethers } from "ethers"
import { useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { useSelector } from "react-redux"
import { retrieveFilesFromIPFS, storeFilesToIPFS } from "../../../api/web3storage.js"
import iComptroller from "../../../utils/IComptroller.json"
import {
  LOCAL_STORAGE_PREFERENCES_CID_KEY,
  LOCAL_STORAGE_INVESTMENTS_CID_KEY,
} from "../../../utils/variables"
import CalculationFeedback from "./Wizard/CalculationFeedback.jsx"
import DisplayResults from "./Wizard/DisplayResults.jsx"
import Goals from "./Wizard/Goals.jsx"
import { Nav, StepWizardStyled, ValueToInvest } from "./Wizard/index.jsx"

export default function Assessment() {
  const userAddress = useSelector((state) => state.user.address)
  const userNativeBalance = useSelector((state) => state.user.nativeBalance)
  const prevInvestments = useSelector((state) => state.investment.investments)

  const [prevPref, setPrevPref] = useState([])
  const [assessmentState, setAssessmentState] = useState({
    walletValueNative: null,
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
    if (userNativeBalance && assessmentState.walletValueNative === null) {
      setAssessmentState({
        ...assessmentState,
        walletValueNative: userNativeBalance,
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

  async function storeInvestmentToIPFS() {
    try {
      const currentBlock = await ethers.providers.getDefaultProvider().getBlock("latest")
      const valueInvested = ethers.utils.parseEther(assessmentState.valueToInvest?.toString())

      const cid = await storeFilesToIPFS(
        `${userAddress}_invest.json`,
        JSON.stringify([
          ...prevInvestments,
          {
            valueInvested,
            remainingBalance: +assessmentState.walletValueNative - +valueInvested,

            timestamp: currentBlock.timestamp,
            currentBlock: currentBlock.number,
          },
        ])
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

  const vaultChoice =
    assessmentState.valueVaultChoice ?? vaultData[assessmentState.valueVaultChoice - 1]

  const { error, runContractFunction } = useWeb3Contract({
    abi: iComptroller.abi,
    contractAddress: vaultChoice?.address,
    // buyShares(uint256 _investmentAmount, uint256 _minSharesQuantity)
    functionName: "buyShares",
    params: {
      _investmentAmount: ethers.utils.parseEther(assessmentState.valueToInvest?.toString() || "0"),
      _minSharesQuantity: 0,
    },
  })

  async function investInVault() {
    try {
      runContractFunction()
      if (error) throw new Error(error)
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

        <DisplayResults
          state={{ ...assessmentState, onValueChange }}
          vaults={vaultData}
          investInVault={investInVault}
        />
      </StepWizardStyled>
    </Flex>
  )
}
