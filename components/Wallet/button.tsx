import React from 'react'
import Button from '../Button'
import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'

export default function WalletConnect() {
    const { open: openModal } = useAppKit()
    const { isConnected } = useAccount()

    if (isConnected) {
        return (
            <w3m-account-button />
        )
    } else {
        return (
            <Button
                backgroundColor={'primary1'}
                width={'full'}
                size={'sm'}
                onClick={() => openModal()}>
                Connect Wallet
            </Button>
        )
    }
}
