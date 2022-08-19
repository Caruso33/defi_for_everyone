import {
  Box,
  Center,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { getTokenInfo } from "api/ethplorer"
import { ethers } from "ethers"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import NavButtons from "./NavButtons"

export default function ValueToInvest(props) {
  const { state } = props

  const userState = useSelector((state) => state.user)
  const tokensState = useSelector((state) => state.tokens)

  const ethPrice = tokensState?.nativeToken?.price?.rate || 0
  const ethCurrency = tokensState?.nativeToken?.price?.currency || "USD"

  function onSliderChange(value) {
    state.onValueSliderChange("valueToInvest", value)
  }

  const ethBalance = (+userState.nativeBalance?.balance || 0) / 1e18
  const ethValue = ethBalance * ethPrice

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={1} {...props} />

      <Box
        border="1px"
        borderRadius="xl"
        px="5rem"
        py="2rem"
        borderColor="gray.500"
      >
        <Text fontSize="2xl">
          Your wallet currently has {ethBalance.toFixed(4)} ETH.
        </Text>

        <TableContainer>
          <Table variant="simple">
            <TableCaption placement="top">Current holdings</TableCaption>

            <Thead>
              <Tr>
                <Th>Asset</Th>
                <Th isNumeric>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{ethBalance.toFixed(4)} ETH</Td>
                <Td isNumeric>$ {ethValue.toFixed(4)}</Td>
              </Tr>

              {userState.tokenBalances.map((token) => {
                const balance = token.balance / Math.pow(10, +token.decimals)

                const tokenInfo = tokensState.tokens.find(
                  (t) => t.address === token.token_address
                )

                const tokenPrice = tokenInfo?.price?.rate || 0
                const tokenValue = balance * tokenPrice

                return (
                  <Tr key={token.symbol}>
                    <Td>
                      {balance} {token.symbol}
                    </Td>
                    <Td isNumeric>${tokenValue.toFixed(2)}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>

        <Box mt="2rem">
          <Text fontSize="2xl">How much are you looking to invest?</Text>

          <Center mt="1rem">
            <Flex flexDirection="column" alignItems="center">
              <Text>{state.valueToInvest} ETH</Text>

              {state.walletValueETH === 0 && (
                <Text>
                  Sorry, not enough ETH funds to invest. Please top up your
                  wallet.
                </Text>
              )}
            </Flex>
          </Center>

          <Slider
            min={0}
            value={state.valueToInvest || 0}
            max={state.walletValueETH}
            step={state.walletValueETH / 10}
            defaultValue={0}
            colorScheme="teal"
            onChange={onSliderChange}
            mt="1rem"
          >
            <SliderTrack bg="#4fd1c5">
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      </Box>
    </Flex>
  )
}
