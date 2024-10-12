import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { cookieStorage, createStorage } from 'wagmi'
import { defineChain } from 'viem'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

export const testnet = defineChain({
    id: 23452,
    name: 'DreyerX Testnet',
    nativeCurrency: {
        name: 'DreyerX',
        symbol: 'DRX',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ['https://testnet-rpc.dreyerx.com'],
        },
    },
    blockExplorers: {
        default: {
            name: 'DreyerX Testnet Scan',
            url: 'https://testnet-scan.dreyerx.com',
        },
    },
    testnet: true,
})

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks: [testnet]
})