import { hardhat, networks, projectId, wagmiAdapter } from '@/config/wagmi'
import { Metadata } from '@reown/appkit'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'
import { Config, cookieToInitialState, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const metadata: Metadata = {
    name: 'dreyerx-faucet',
    description: 'DreyerX Faucet Apps',
    url: 'https://faucet.dreyerx.com',
    icons: ['https://storage.dreyerx.com/logo/logo-without-bg.png']
}

createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks,
    defaultNetwork: hardhat,
    metadata,
    features: {
        analytics: false,
        swaps: false
    }
})
export default function AppWalletProvider(props: {
    children: ReactNode
}) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config)
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>
                { props.children }
            </QueryClientProvider>
        </WagmiProvider>
    )
}
