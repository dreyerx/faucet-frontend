'use client'
import { Box, Button, Flex, Input, Link, Toast, VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import detectEthereumProvider from "@metamask/detect-provider";

import React, { Component } from 'react'

declare global {
  interface Window {
    ethereum?: import("ethers").Eip1193Provider
  }
}

interface IState {
  alertColor: string,
  alertMessage: string,

  buttonClaimDisabled: boolean,
  buttonClaimLoading: boolean,

  address: string,
  tx: string
}

export default class Home extends Component<{}, IState> {
  constructor(props: any) {
    super(props)

    this.state = {
      alertColor: "#ff5252",
      alertMessage: "This is a testnet network, you cannot withdraw funds",

      buttonClaimDisabled: false,
      buttonClaimLoading: false,

      address: "",
      tx: ""
    }
  }

  // componentDidMount(): void {
  //   this.setState({
  //     alertColor: "",
  //     alertMessage: 
  //   })
  // }
  claimCoin() {
    (async () => {
      this.setState({
        buttonClaimDisabled: true,
        buttonClaimLoading: true
      })
      const response = await fetch("http://103.59.160.67:8081/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: this.state.address
        })
      })
      const response_json = await response.json()
      console.log(response_json)
      if (response_json.status == "ok") {
        this.setState({
          tx: response_json.data.transaction_hash,
          buttonClaimLoading: false
        })
      } else {
        this.setState({
          alertMessage: response_json.message,
          buttonClaimLoading: false
        })
      }
    })()
  }

  async addNetworkMetamask() {
    try {
      const result = await window.ethereum?.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: "0x5b9c",
          rpcUrls: ["https://testnet-rpc.dreyerx.com"],
          chainName: "DreyerX Testnet",
          nativeCurrency: {
            name: "DreyerX",
            symbol: "DRX",
            decimals: 18
          },
          blockExplorerUrls: ["https://testnet-scan.dreyerx.com"]
        }]
      })
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  renderAlert() {
    if (this.state.tx === "") {
      return (
        <Box borderWidth={1} borderColor={this.state.alertColor} color={this.state.alertColor} w={"full"} p={3} px={4} borderRadius={2}>
          {this.state.alertMessage}
        </Box>
      )
    } else {
      return (
        <Box borderWidth={1} borderColor={"#80ff52"} color={"#80ff52"} w={"full"} p={3} px={4} borderRadius={2}>
          Transaction Hash: <Link href={`https://testnet-scan.dreyerx.com/tx/${this.state.tx}`}>{this.state.tx.substring(0, 20)}...{this.state.tx.substring(this.state.tx.length - 5, this.state.tx.length)}</Link>
        </Box>
      )
    }
  }

  render() {
    return (
      <>
        <Box
          width={{ base: 200, lg: 300, md: 250 }}
          height={{ base: 200, lg: 300, md: 250 }}
          bg={"primary"}
          position={"absolute"}
          filter={"blur(150px)"}
          opacity={.5}
          top={{ base: 5, lg: 150, md: 150 }}
          left={{ base: 5, lg: 500, md: 150 }}
          zIndex={-10000}
        />
        <Box
          width={{ base: 200, lg: 300, md: 250 }}
          height={{ base: 200, lg: 300, md: 250 }}
          bg={"#ff5252"}
          position={"absolute"}
          filter={"blur(150px)"}
          opacity={.5}
          bottom={{ base: 5, lg: 150, md: 150 }}
          right={{ base: 1, lg: 500, md: 150 }}
          zIndex={-10000}
        />
        <Flex justify={"center"} align={"center"} flexDirection={"column"} minH={"100vh"} gap={5}>
          <Box bg={"card"} borderRadius={10} minH={400} p={10} borderWidth={1}>
            <Flex alignItems={"center"} flexDirection={"column"} w={{ base: 250, md: 400, lg: 500 }}>
              <Image src={"/images/dreyerx-horizontal.png"} alt="Logo" transitionDuration={'0.5s'} transitionTimingFunction={"ease-in-out"} w={{ base: 300 }} cursor={"pointer"} _hover={{
                transform: "translateY(-10px)"
              }} />

              <VStack w={"full"} my={10} gap={5}>
                <Input placeholder="Your address (0x...)" borderWidth={1} borderColor={"rgba(255,255,255,.2)"} p={3} px={4} fontSize={16} color={"rgba(255,255,255,.5)"} variant={"unstyled"} value={this.state.address} onChange={(e) => this.setState({ address: e.target.value })} />

                {this.renderAlert()}
                <Button bg={"none"} borderWidth={1} borderColor={"primary"} w={"full"} px={4} p={4} fontWeight={"normal"} _hover={{ bg: "none", borderWidth: 1, borderColor: "primary", transform: "translateY(-5px)" }} transitionDuration={"0.5s"} transitionTimingFunction={"ease-in-out"} _disabled={{ opacity: .5, cursor: "default", transform: "none" }} isLoading={this.state.buttonClaimLoading} isDisabled={this.state.buttonClaimDisabled} onClick={() => this.claimCoin()}>
                  REQUEST 5 DRX
                </Button>
              </VStack>
            </Flex>
          </Box>

          <Box bg={"card"} borderRadius={10} minH={120} p={10} borderWidth={1}>
            <Flex alignItems={"center"} flexDirection={"column"} w={{ base: 250, md: 400, lg: 500 }}>
              <Button onClick={async () => await this.addNetworkMetamask()} bg={"none"} borderWidth={1} borderColor={"primary"} w={"full"} px={4} p={4} fontWeight={"normal"} _hover={{ bg: "none", borderWidth: 1, borderColor: "primary", transform: "translateY(-5px)" }} transitionDuration={"0.5s"} transitionTimingFunction={"ease-in-out"}>
                <Image src={"/images/metamask.png"} width={7} mx={3} />
                Add network to Metamask
              </Button>
            </Flex>
          </Box>
        </Flex>
      </>
    )
  }
}