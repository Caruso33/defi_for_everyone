import { createSlice } from "@reduxjs/toolkit"

export const initialInvestmentState = {
  investments: [],
  isInvestmentsLoading: false,
  isInvestmentsLoaded: false,
}

export const investmentSlice = createSlice({
  name: "investment",
  initialState: initialInvestmentState,
  reducers: {
    setInvestments: (state, action) => {
      state.investments = action.payload
    },
    setIsInvestmentsLoading: (state, action) => {
      state.isInvestmentsLoading = action.payload
    },
    setIsInvestmentsLoaded: (state, action) => {
      state.isInvestmentsLoaded = action.payload
    },
  },
})

export const investmentActions = investmentSlice.actions

export default investmentSlice.reducer
