import { createSlice } from "@reduxjs/toolkit"

export const initialUserState = {
  address: "",

  nativeBalance: "",
  isNativeBalanceLoading: false,
  isNativeBalanceLoaded: false,

  tokenBalances: [],
  isTokenBalancesLoading: false,
  isTokenBalancesLoaded: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload
    },

    setNativeBalance: (state, action) => {
      state.nativeBalance = action.payload
    },
    setIsNativeBalanceLoading: (state, action) => {
      state.isNativeBalanceLoading = action.payload
    },
    setIsNativeBalanceLoaded: (state, action) => {
      state.isNativeBalanceLoaded = action.payload
    },

    setTokenBalances: (state, action) => {
      state.tokenBalances = action.payload
    },
    setIsTokenBalancesLoading: (state, action) => {
      state.isTokenBalancesLoading = action.payload
    },
    setIsTokenBalancesLoaded: (state, action) => {
      state.isTokenBalancesLoaded = action.payload
    },
  },
})

export const userActions = userSlice.actions

export default userSlice.reducer
