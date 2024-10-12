import { RequestCallbackState } from '@/hooks/useRequestCallback'
import React from 'react'
import { ModalWrapper } from './wrapper'
import { Flex, Spinner, Text, useToken } from '@chakra-ui/react'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import Link from 'next/link'
import { transparentize } from 'polished'

export function ModalSuccess(props: {
    tx: string
}) {
    const [text, bgSuccess] = useToken('colors', ['text', 'alert.success.background'])

    return (
        <Flex
            flexDirection={'column'}
            gap={3}
            justify={'center'}
            align={'center'}
            marginY={10}
        >
            <FaCheckCircle color={bgSuccess} size={80} />

            <Flex
                marginTop={10}
                flexDirection={'column'}
                align={'center'}
                gap={1}
            >
                <Text
                    fontWeight={'semibold'}
                    fontSize={'14px'}
                >
                    Successfully to request faucet
                </Text>

                <Link
                    href={`https://testnet-scan.dreyerx.com/tx/${props.tx}`}
                    target='_blank'
                    color={transparentize(0.5, text)}
                >
                    View on explorer
                </Link>
            </Flex>
        </Flex>
    )
}

export function ModalError(props: {
    message: string
}) {
    const [bgError] = useToken('colors', ['alert.error.background'])

    return (
        <Flex
            flexDirection={'column'}
            gap={3}
            justify={'center'}
            align={'center'}
            marginY={10}
        >
            <FaExclamationTriangle color={bgError} size={'80px'} />

            <Flex
                marginTop={10}
                flexDirection={'column'}
                align={'center'}
                gap={1}
            >
                <Text
                    fontWeight={'semibold'}
                    fontSize={'14px'}
                >
                    {props.message}
                </Text>
            </Flex>
        </Flex>
    )
}

export function ModalLoading() {
    return (
        <Flex
            flexDirection={'column'}
            gap={3}
            justify={'center'}
            align={'center'}
            marginY={10}
        >
            <Spinner width={'80px'} height={'80px'} color='primary1' />

            <Flex
                marginTop={10}
                flexDirection={'column'}
                align={'center'}
                gap={1}
            >
                <Text
                    fontWeight={'semibold'}
                    fontSize={'14px'}
                >
                    Request Testnet Faucet
                </Text>
            </Flex>
        </Flex>
    )
}

export function ModalState(props: {
    isOpen: boolean,
    onClose: () => void,
    state: RequestCallbackState,
    tx: string | null,
    message: string | null
}) {
    const title = props.state === RequestCallbackState.LOADING ? 'Please wait'
        : props.state === RequestCallbackState.OK ? 'Success' : 'Error'

    return (
        <ModalWrapper
            isOpen={props.isOpen}
            onClose={props.onClose}
            title={title}
        >
            {
                props.state === RequestCallbackState.LOADING ? (
                    <ModalLoading />
                ) : props.state === RequestCallbackState.OK ? (
                    <ModalSuccess tx={props.tx ?? ''} />
                ) : props.state === RequestCallbackState.ERROR ? (
                    <ModalError message={props.message ?? ''} />
                ) : null
            }
        </ModalWrapper>
    )
}
