import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import investmentReducer, { initialInvestmentState, investmentActions } from "./investment"
import tokenReducer, { initialTokenState, tokenActions } from "./token"
import userReducer, { initialUserState, userActions } from "./user"

export const actionTypes = {
  userActions,
  tokenActions,
  investmentActions,
}

export default configureStore({
  reducer: {
    user: userReducer,
    tokens: tokenReducer,
    investment: investmentReducer,
  },
  preloadedState: {
    user: initialUserState,
    tokens: initialTokenState,
    investment: initialInvestmentState,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
