import React from 'react'
import Button from '../Button'
import { useAppState } from '@/state/hooks'
import { isAddress } from 'viem'
import useRequestCallback from '@/hooks/useRequestCallback'
import { useDisclosure } from '@chakra-ui/react'
import { ModalState } from '../Modal'

export default function ButtonAction() {
    const { address } = useAppState()
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()

    const { callback, state, errorMessage, tx } = useRequestCallback()

    const handleRequest = async () => {
        onModalOpen()
        await callback()
    }

    if (address && !isAddress(address)) {
        return (
            <Button
                size={'sm'}
                backgroundColor={'alert.error.background'}
                alignSelf={'end'}
                disabled
            >
                Incorrect Wallet Address
            </Button>
        )
    }

    if (address) {
        return (
            <>
                <Button
                    size={'sm'}
                    backgroundColor={'primary1'}
                    alignSelf={'end'}

                    onClick={() => handleRequest()}
                >
                    Request 5 DRX
                </Button>

                <ModalState
                    isOpen={isModalOpen}
                    onClose={onModalClose}
                    state={state}
                    tx={tx}
                    message={errorMessage}
                />
            </>
        )
    } else {
        return (
            <Button
                size={'sm'}
                backgroundColor={'bg1'}
                alignSelf={'end'}
                disabled
            >
                Enter Wallet Address
            </Button>
        )
    }
}
