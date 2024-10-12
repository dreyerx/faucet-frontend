import { createReducer } from "@reduxjs/toolkit"
import { typeInput } from "./action"

export interface AppState {
    address: string
}

const initialState: AppState = {
    address: ''
}

const appReducer = createReducer(initialState, builder => {
    builder.addCase(typeInput, (state, action) => {
        state.address = action.payload.address
    })
})

export default appReducer