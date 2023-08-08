import { configureStore } from '@reduxjs/toolkit'
import loginModalReducer from './slices/loginModalSlice'
import RegisterModalSlice from './slices/RegisterModalSlice'

export const store = configureStore({
  reducer: {
    loginModal: loginModalReducer,
    registerModal: RegisterModalSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch