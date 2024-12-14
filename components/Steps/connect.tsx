'use client'
import React, { useEffect } from 'react'
import { Flex, Input, Divider, Text, useToken } from '@chakra-ui/react'
import { transparentize } from 'polished'
import { useAccount } from 'wagmi'
import WalletConnect from '../Wallet/button'
import { useAppState, useFaucetHandler } from '@/state/hooks'

export default function ConnectStep() {
    const [text, border] = useToken('colors', ['text', 'border', 'primary1'])
    const { isConnected, address } = useAccount()

    const { address: inputAddress } = useAppState()
    const { onInputAddress } = useFaucetHandler()

    useEffect(() => {
        onInputAddress(
            address ?? ''
        )
    }, [address, onInputAddress])

    return (
        <Flex
            flexDirection={'column'}
            gap={3}
            width={'full'}
        >
            <WalletConnect />
            <Flex gap={5} w={'full'} align={'center'}>
                <Divider color={'white'} />
                <Text fontSize={'12px'}>Or</Text>
                <Divider color={'white'} />
            </Flex>
            <Flex flexDirection={'column'} gap={2}>
                <Input
                    placeholder="0x"
                    textAlign={'left'}
                    borderWidth={1}
                    color={text}
                    borderColor={transparentize(0.9, border)}
                    value={inputAddress}
                    readOnly={isConnected}
                    onChange={(event) => onInputAddress(event.target.value)}
                    _hover={{
                        borderColor: transparentize(0.8, border)
                    }}
                    _focusVisible={{
                        borderColor: transparentize(0.8, border)
                    }}
                />
                <Text fontSize={'10px'} color={transparentize(.5, text)}>
                    Enter your DreyerX address to receive test DRX
                </Text>
            </Flex>
        </Flex>
    )
}
