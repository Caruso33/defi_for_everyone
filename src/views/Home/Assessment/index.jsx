import { Flex } from "@chakra-ui/react"
import { useState } from "react"
import Goals from "./Wizard/Goals.jsx"
import { Nav, StepWizardStyled, ValueToInvest } from "./Wizard/index.jsx"

export default function Assessment() {
  const [assessmentState, setAssessmentState] = useState({
    walletValueETH: null,
    valueToInvest: null,
    valueGoal: null,
    valueRiskProfile: null,
    valueMarketReaction: null,
    valueVaultChoice: null,
  })

  const onValueChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value })

  const onValueSliderChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value })

  let child = null

  return (
    <Flex pt={{ base: "120px", md: "75px" }}>
      {!child ? (
        <StepWizardStyled nav={<Nav />}>
          <ValueToInvest state={{ ...assessmentState, onValueSliderChange }} />

          <Goals
            state={{ ...assessmentState, onValueSliderChange, onValueChange }}
          />
        </StepWizardStyled>
      ) : (
        child
      )}
    </Flex>
  )
}
