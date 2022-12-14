import { Box, Flex, Progress, Text } from "@chakra-ui/react"
import { useCallback, useEffect, useRef, useState } from "react"
import NavButtons from "./NavButtons"
import { calculateRiskProfile, getVaults } from "./utils"

export default function CalculationFeedback(props) {
  const [progressValue, setProgressValue] = useState(0)
  const [timer, setTimer] = useState(null)

  const { state, vaults, storeAssessmentToIPFS } = props

  const [loadingVaults, setLoadingVaults] = useState(false)

  const allValuesCollected = !!state.valueToInvest && !!state.valueRiskProfile
  // && !!state.valueMarketReaction

  const progressRef = useRef(progressValue)
  const timerRef = useRef(timer)

  useEffect(() => {
    progressRef.current = progressValue
  }, [progressValue])

  useEffect(() => {
    timerRef.current = timer
  }, [timer])

  const getVaultData = useCallback(async () => {
    const riskProfile = calculateRiskProfile(state)
    const vaultData = getVaults(riskProfile)

    vaults.setVaultData(vaultData)
    console.log("Setting vault data: ", vaultData)

    return vaultData
  }, [vaults, state])

  useEffect(() => {
    async function getVaultsForRiskProfile() {
      if (
        props.isActive &&
        allValuesCollected &&
        vaults.vaultData.length === 0 &&
        !loadingVaults
      ) {
        setLoadingVaults(true)

        // storeAssessmentToIPFS()
        await getVaultData()

        setLoadingVaults(false)
      }
    }

    getVaultsForRiskProfile()
  }, [
    state,
    props.isActive,
    allValuesCollected,
    loadingVaults,
    setLoadingVaults,
    getVaultData,
    storeAssessmentToIPFS,
    vaults.vaultData.length,
  ])

  const updateProgress = useCallback(() => {
    if (progressRef.current === 100) {
      clearInterval(timerRef.current)
    }

    setProgressValue((progressValue) =>
      progressValue + 1 > 100 ? 100 : progressValue + 1
    )
  }, [])

  const previousIsActive = useRef(false)
  useEffect(() => {
    if (!previousIsActive.current && props.isActive && allValuesCollected) {
      previousIsActive.current = true

      const timer = setInterval(() => {
        updateProgress()
      }, 50)
      setTimer(timer)
    }

    if (!props.isActive && previousIsActive.current) {
      previousIsActive.current = false

      clearInterval(timerRef.current)

      if (props.currentStep === 3) setProgressValue(0)
    }
  }, [
    props.isActive,
    props.currentStep,
    timer,
    allValuesCollected,
    updateProgress,
  ])

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={3} hideForward={progressValue !== 100} {...props} />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        {allValuesCollected ? (
          <>
            <Text fontSize="2xl">
              Calculating ideal recommendations based on your answers.
            </Text>
            <Text fontSize="2xl">
              Determining the best solution for your needs.
            </Text>

            <Text mt="2rem">{progressValue}%</Text>

            <Text>
              {progressValue === 100 &&
                "Best package found! Forwarding to your best fitting vaults."}
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="2xl">Not all values are collected yet!</Text>
            <Text fontSize="2xl">
              Please fill all questions of previous steps.
            </Text>
          </>
        )}

        <Progress colorScheme="teal" mt="1rem" value={progressValue} />
      </Box>
    </Flex>
  )
}
