import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface protectedRoute {
    value: boolean | null
}

const initialState: protectedRoute = {
    value: null,
}

export const protectedRouteSlice = createSlice({
    name: 'protectedRoute',
    initialState,
    reducers: {
        protectedRouteModel: (state, action) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { protectedRouteModel } = protectedRouteSlice.actions

export default protectedRouteSlice.reducer