import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface LoginModalState {
    isLoginModalOpen: boolean,
}

const initialState: LoginModalState = {
    isLoginModalOpen: false,
}

export const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    onLoginModalOpen: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoginModalOpen = true
    },
    onLoginModalClose: (state) => {
      state.isLoginModalOpen = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { onLoginModalClose, onLoginModalOpen } = loginModalSlice.actions

export default loginModalSlice.reducer