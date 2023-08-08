import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface RegisterModalState {
    isRegisterModalOpen: boolean,
}

const initialState: RegisterModalState = {
    isRegisterModalOpen: true,
}

export const RegisterModalSlice = createSlice({
  name: 'RegisterModal',
  initialState,
  reducers: {
    onRegisterModalOpen: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isRegisterModalOpen = true
    },
    onRegisterModalClose: (state) => {
      state.isRegisterModalOpen = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { onRegisterModalClose, onRegisterModalOpen } = RegisterModalSlice.actions

export default RegisterModalSlice.reducer