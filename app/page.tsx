"use client"
import { Alert, AlertIcon, AlertStatus, Box, Button, CloseButton, Flex, HStack, Heading, Image, Input, Link, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useBreakpoint } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

import React, { Component } from 'react'
import { claimFaucet, getLastTransactions } from "./logic/api";

interface TxProps {
  tx: string,
  date: Date,
  to: string,
  value: number,
  block: string
}

interface TxResponseProps {
  block: string,
  timestamp: string,
  to: string,
  txhash: string,
  value: number
}

interface HomeState {
  lastTxs: Array<TxProps>,
  address: string,

  alertVisible: boolean,
  alertMessage: string,
  alertColor: string,

  tableFooterText: string
}

const ALERT_ERROR_BG = "#a11a1a"
const ALERT_SUCCESS_BG = "#1ca11a"

export default class Home extends Component<{}, HomeState> {
  constructor(props: any) {
    super(props)

    this.state = {
      address: "",
      lastTxs: [],
      alertVisible: false,
      alertMessage: "",
      alertColor: "#a11a1a",

      tableFooterText: "DreyerX Faucet Last Transactions"
    }
  }

  async syncLastTransactions() {
    const lastTransactions = await getLastTransactions()
    if (lastTransactions.status == "ok") {
      const data = lastTransactions.data
      let lastTxs: Array<TxProps> = []
      data.forEach((v: TxResponseProps) => {
        lastTxs.push({
          tx: v.txhash,
          date: new Date(v.timestamp),
          to: v.to,
          value: v.value,
          block: v.block
        })
      })
      this.setState({ lastTxs: lastTxs })
    }
  }

  componentDidMount(): void {
    (async () => {
      await this.syncLastTransactions()
    })()
  }

  showAlert(message: string, bg: string) {
    this.setState({
      alertMessage: message,
      alertVisible: true,
      alertColor: bg
    })
  }

  async sendTestCoin() {
    if (this.state.address === "") {
      this.showAlert("The address cannot be empty!", ALERT_ERROR_BG)
    } else {
      const response = await claimFaucet(this.state.address)
      if (response.status == "fail") {
        this.showAlert(response.message, ALERT_ERROR_BG)
      } else {
        this.showAlert("Successfully to claim faucet", ALERT_SUCCESS_BG)
        await this.syncLastTransactions()
      }
    }
  }

  render() {
    return (
      <>
        <Image
          src="https://svgshare.com/i/eGa.svg"
          w={"full"}
          h={"calc(100vh)"}
          opacity={.2}
          position={"absolute"}
          zIndex={-9999}
        />

        <Flex
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          height={"calc(100vh)"}
          mx={{ base: 2, sm: 5, md: 10, lg: 400 }}
        >
          <Box bg={"card"} p={10} w={"full"}>
            <Heading size={{ sm: "sm", base: "md" }}>
              DreyerX Testnet Faucet
            </Heading>
            <Box mt={10}>
              {
                this.state.alertVisible ? (
                  <Alert mb={3} bg={this.state.alertColor} borderRadius={10}>
                    <AlertIcon color={"white"} />
                    <Text>{this.state.alertMessage}</Text>
                    <CloseButton
                      ml={"auto"}

                      onClick={() => this.setState({ alertVisible: false })}
                    />
                  </Alert>
                ) : null
              }
              <Input
                placeholder="Enter your wallet"
                ringColor={"primary"}
                _active={{
                  outlineColor: "primary"
                }}
                onChange={(e) => this.setState({ address: e.target.value })}
              />
              <Button
                w={"full"}
                mt={3}
                bg={"primary"}
                fontWeight={"500"}
                _hover={{
                  bg: "hover.primary"
                }}
                _active={{
                  bg: "hover.primary"
                }}
                onClick={async () => this.sendTestCoin()}
              >Send me test coin</Button>
            </Box>
          </Box>
          <Box bg={"card"} p={10} w={"full"}>
            <Heading size={"md"}>
              Last Transactions
            </Heading>
            <Box mt={10}>
              <TableContainer>
                <Table>
                  <TableCaption opacity={.5}>{this.state.tableFooterText}</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Txn Hash</Th>
                      <Th>Block</Th>
                      <Th>Age</Th>
                      <Th>To</Th>
                      <Th>Value</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      this.state.lastTxs.map((v: TxProps, index: number) => {
                        return (
                          <Tr key={v.tx}>
                            <Td>{v.tx.slice(0, 5)}...</Td>
                            <Td>{v.block}</Td>
                            <Td>{moment(v.date).fromNow()}</Td>
                            <Td>{v.to.slice(0, 5)}...</Td>
                            <Td>{v.value / 10 ** 18}</Td>
                          </Tr>
                        )
                      })
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Flex>
      </>
    )
  }
}