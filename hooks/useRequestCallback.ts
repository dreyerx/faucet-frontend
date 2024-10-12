import axios from "axios";
import { useAppState } from "@/state/hooks";
import { useCallback, useState } from "react";
import { ResponseData } from "@/app/api/faucet/route";

export enum RequestCallbackState {
    OK = 'ok',
    UNKNOWN = 'unknown',
    LOADING = 'loading',
    ERROR = 'error'
}

export default function useRequestCallback() {
    const [state, setState] = useState<RequestCallbackState>(RequestCallbackState.UNKNOWN)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [tx, setTx] = useState<string>('')

    const { address } = useAppState()

    const callback = useCallback(async () => {
        try {
            setState(RequestCallbackState.LOADING)
            const response = await axios.post('api/faucet', { address }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const responseData = response.data as ResponseData

            if (responseData.status === 'error') {
                setState(RequestCallbackState.ERROR)
                setErrorMessage(responseData.message)
            } else {
                setState(RequestCallbackState.OK)
                setTx(responseData.data?.tx ?? '')
            }
        } catch (error) {
            console.log('Error', error)
        }
    }, [address])

    return { callback, state, errorMessage, tx }
}
