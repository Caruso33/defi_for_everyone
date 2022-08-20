import {
  Box,
  Button,
  Flex,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react"
import { ethers } from "ethers"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Card } from "./index"
import NavButtons from "./NavButtons"

export default function DisplayResults(props) {
  const [deposited, setDeposited] = useState(false)

  const userAddress = useSelector((user) => user.address)

  const { state, vaults } = props

  function onCardClick(value) {
    setDeposited(false)

    state.onValueChange("valueVaultChoice", value)
  }

  async function investInVault() {
    setDeposited(false)

    const { valueToInvest, valueVaultChoice } = state

    const vaultChoice = vaults[valueVaultChoice - 1]

    const vaultContract = new ethers.Contract(vaultChoice.address, []) //signer)

    const amountIn = ethers.utils.parseUnits(`${valueToInvest}`, 18)
    const minAmountOut = 0
    const to = userAddress
    const referer = "0x4bFC74983D6338D3395A00118546614bB78472c2"

    try {
      await vaultContract
        // .connect(signer)
        .deposit(amountIn, minAmountOut, to, referer, {
          value: amountIn,
        })
      onCardClick(null) // reset vault
      setDeposited(true)
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={4} {...props} />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        {vaults.length ? (
          <>
            <Text fontSize="2xl">Recommendations ready.</Text>
            <br />
            <Text fontSize="2xl">
              Vaults shown are most aligned with your determined needs.
            </Text>

            <Flex>
              {vaults.slice(0, 3).map((vault, index) => {
                let vaultData = vaults.find(
                  (data) => data.address === vault.address
                )
                if (!vaultData) {
                  vaultData = {
                    description: "",
                    aum: 0,
                    "M-1": 0,
                    "M-2": 0,
                  }
                }

                const VaultLogo = (
                  <img
                    src={`https://ethplorer.io/images/${vault.reserveAsset.toLowerCase()}.png`}
                    alt={vault.reserveAssetSymbol}
                    style={{ maxWidth: "70px", maxHeight: "70px" }}
                  />
                )

                return (
                  <Card
                    key={vault.name}
                    display="flex"
                    flexDirection="column"
                    border="1px"
                    borderRadius="xl"
                    borderColor="teal.300"
                    m="2rem 1rem 1rem 1rem"
                    p="1rem"
                    onClick={() => onCardClick(index + 1)}
                    active={state.valueVaultChoice === index + 1 ? 1 : 0}
                  >
                    <Flex mx="1rem" w="100%" justifyContent="center">
                      {VaultLogo}
                    </Flex>

                    <Text fontSize="2xl" mt="1rem">
                      {vault.name}
                    </Text>

                    <Text mt="1rem" wordBreak="break-all">
                      {vaultData.description}
                    </Text>

                    <TableContainer mt="2rem">
                      <Table variant="simple">
                        <Tbody>
                          <Tr>
                            <Td>AUM</Td>
                            <Td isNumeric>{vault.aum}$</Td>
                          </Tr>
                          <Tr>
                            <Td>30D</Td>
                            <Td isNumeric>{vaultData["M-1"]}%</Td>
                          </Tr>
                          <Tr>
                            <Td>60D</Td>
                            <Td isNumeric>{vaultData["M-2"]}%</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>

                    <Link mt="1rem" wordBreak="break-all">
                      <Text fontSize="sm">{vaultData.url}</Text>
                    </Link>
                  </Card>
                )
              })}
            </Flex>

            <Button disabled={!state.valueVaultChoice} onClick={investInVault}>
              Deposit
            </Button>

            {deposited && <Text> Successfully deposited to chosen vault.</Text>}
          </>
        ) : (
          <Text fontSize="2xl">
            Vaults not loaded. Were you missing some steps?
          </Text>
        )}
      </Box>
    </Flex>
  )
}
