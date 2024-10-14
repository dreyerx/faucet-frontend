import { ethers, JsonRpcProvider } from 'ethers'
import { FAUCET_ADDRESS, SIGNER_PRIVATE_KEY } from "@/config/constants"
import { wagmiAdapter } from "@/config/wagmi"
import { NextResponse } from "next/server"
import { isAddress } from "viem"
import { getBalance } from 'wagmi/actions'
import FaucetArtifacts from '@/config/artifacts/faucet.json'

export type ResponseData = {
    status: string,
    message: string,
    data?: {
        tx: string
    }
}

const provider = new JsonRpcProvider("https://testnet-rpc.dreyerx.com")
const signer = new ethers.Wallet(SIGNER_PRIVATE_KEY, provider)

export async function POST(
    request: Request
) {
    const balance = await getBalance(wagmiAdapter.wagmiConfig, {
        address: FAUCET_ADDRESS
    })
    const { address } = await request.json()

    if (typeof address === 'undefined') {
        return NextResponse.json({
            status: 'error',
            message: 'address is required'
        })
    }

    const isValid = isAddress(address)
    if (!isValid) {
        return NextResponse.json({
            status: 'error',
            message: 'invalid address format'
        })
    }

    if (balance.value < BigInt(5)) {
        return NextResponse.json({
            status: 'error',
            message: 'insufficient faucet address balance'
        })
    }

    try {
        const contract = new ethers.Contract(FAUCET_ADDRESS, FaucetArtifacts.abi, signer)
        const tx = await contract.request(address)
        await tx.wait()

        return NextResponse.json({
            status: 'ok',
            message: 'successfully to request faucet',
            data: {
                tx: tx.hash
            }
        })
    } catch (error) {
        if (ethers.isCallException(error)) {
            return NextResponse.json({
                status: 'error',
                message: error.reason
            })
        }
    }
}