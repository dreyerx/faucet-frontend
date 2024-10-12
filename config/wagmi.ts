import type { CaipNetwork } from '@reown/appkit-common'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { cookieStorage, createStorage } from 'wagmi'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const hardhat: CaipNetwork = {
    id: 'eip155:31337',
    chainId: 31337,
    name: 'Hardhat',
    currency: 'ETH',
    rpcUrl: 'http://localhost:8545',
    explorerUrl: 'http://localhost:8080',
    chainNamespace: 'eip155'
}

export const testnet: CaipNetwork = {
    id: 'eip155:23452',
    chainId: 23452,
    name: 'DreyerX Testnet',
    currency: 'DRX',
    rpcUrl: 'https://testnet-rpc.dreyerx.com',
    explorerUrl: 'https://testnet-scan.dreyerx.com',
    chainNamespace: 'eip155'
}

export const networks = [testnet]

export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks
})