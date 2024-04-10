import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface openAddNewsModel {
    value: boolean
}

const initialState: openAddNewsModel = {
    value: false,
}

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        openAddNewsModel: (state) => {
            if (state.value === false) {
                state.value = true
            }
            else {
                state.value = false
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { openAddNewsModel } = newsSlice.actions

export default newsSlice.reducer