import { createSlice } from "@reduxjs/toolkit"

export const initialTokenState = {
  nativeToken: {},
  isNativeTokenLoading: false,
  isNativeTokenLoaded: false,

  tokens: [],
  isTokensLoading: false,
  isTokensLoaded: false,
}

export const tokenSlice = createSlice({
  name: "token",
  initialState: initialTokenState,
  reducers: {
    setNativeToken: (state, action) => {
      state.nativeToken = action.payload
    },
    setIsNativeTokenLoading: (state, action) => {
      state.isNativeTokenLoading = action.payload
    },
    setIsNativeTokenLoaded: (state, action) => {
      state.isNativeTokenLoaded = action.payload
    },

    setTokens: (state, action) => {
      state.tokens = action.payload
    },
    setIsTokensLoading: (state, action) => {
      state.isTokensLoading = action.payload
    },
    setIsTokensLoaded: (state, action) => {
      state.isTokensLoaded = action.payload
    },
  },
})

export const tokenActions = tokenSlice.actions

export default tokenSlice.reducer
