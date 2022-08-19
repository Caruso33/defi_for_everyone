import { Flex } from "@chakra-ui/react"
import { useState } from "react"
import { Nav, StepWizardStyled, ValueToInvest } from "./Wizard/index.jsx"

export default function Assessment() {
  const [assessmentState, setAssessmentState] = useState({
    walletValueETH: null,
    valueToInvest: null,
    valueRiskProfile: null,
    valueMarketReaction: null,
    valueVaultChoice: null,
  })

  const onValueSliderChange = (key, value) =>
    setAssessmentState({ ...assessmentState, [key]: value })

  let child = null

  return (
    <Flex pt={{ base: "120px", md: "75px" }}>
      {!child ? (
        <StepWizardStyled nav={<Nav />}>
          <ValueToInvest state={{ ...assessmentState, onValueSliderChange }} />
        </StepWizardStyled>
      ) : (
        child
      )}
    </Flex>
  )
}
