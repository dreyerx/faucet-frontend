import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { typeInput } from "./action";

export function useAppState(): RootState['app'] {
    return useSelector<RootState, RootState['app']>(state => state.app)
}

export function useFaucetHandler(): {
    onInputAddress: (address: string) => void
} {
    const dispatch = useDispatch<AppDispatch>()

    const onInputAddress = useCallback((address: string) => {
        dispatch(typeInput({ address }))
    }, [dispatch])

    return { onInputAddress }
}