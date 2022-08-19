import { configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import userReducer, { initialUserState, userActions } from "./user"
import tokenReducer, { initialTokenState, tokenActions } from "./tokens"

export const actionTypes = {
  userActions,
  tokenActions,
}

export default configureStore({
  reducer: {
    user: userReducer,
    tokens: tokenReducer,
  },
  preloadedState: {
    user: initialUserState,
    tokens: initialTokenState,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
