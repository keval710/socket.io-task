import { configureStore } from '@reduxjs/toolkit'
import newsSliceReducer from "./features/newsSlice"
import protectedRoutesReducer from "./features/protectedRouteSlice"

export const store = configureStore({
    reducer: {
        news: newsSliceReducer,
        protectedRoutes: protectedRoutesReducer
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch