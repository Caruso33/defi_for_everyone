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
import { useState } from "react"
import { Card } from "./index"
import NavButtons from "./NavButtons"

export default function DisplayResults(props) {
  const [deposited, setDeposited] = useState(false)

  const { state, vaults, investInVault } = props

  function onCardClick(value) {
    setDeposited(false)

    state.onValueChange("valueVaultChoice", value)
  }

  async function onClickInvest() {
    setDeposited(false)

    await investInVault()

    onCardClick(null) // reset vault
    setDeposited(true)
  }

  return (
    <Flex direction={"column"} alignItems="center" maxW="80vw">
      <NavButtons step={4} {...props} />

      <Box border="1px" borderRadius="xl" p="2rem" borderColor="gray.500">
        {vaults.length ? (
          <>
            <Text fontSize="xl">Recommendations ready.</Text>
            <br />
            <Text fontSize="xl">Vaults shown are most aligned with your determined needs.</Text>

            <Flex>
              {vaults.slice(0, 3).map((vault, index) => {
                let vaultData = vaults.find((data) => data.address === vault.address)
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

                    <Text fontSize="sm" mt="1rem" wordBreak="break-all">
                      {vaultData.address}
                    </Text>

                    <Link mt="1rem" wordBreak="break-all">
                      <Text fontSize="sm">{`https://app.enzyme.finance/vault/${vaultData.url}`}</Text>
                    </Link>
                  </Card>
                )
              })}
            </Flex>

            <Button disabled={!state.valueVaultChoice} onClick={onClickInvest}>
              Deposit
            </Button>

            {deposited && <Text> Successfully deposited to chosen vault.</Text>}
          </>
        ) : (
          <Text fontSize="2xl">Vaults not loaded. Were you missing some steps?</Text>
        )}
      </Box>
    </Flex>
  )
}
