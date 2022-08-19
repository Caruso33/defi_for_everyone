import React from "react"
import ReactDOM from "react-dom/client"
import { MoralisProvider } from "react-moralis"
import { Provider as ReduxProvider } from "react-redux"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { useGetWalletBalances } from "./hooks/moralis"
import { useGetTokenPrices } from "./hooks/prices"
import "./index.css"
import HomeLayout from "./layouts/HomeLayout.js"
import reportWebVitals from "./reportWebVitals"
import store from "./state/store"
import { MORALIS_APP_ID, MORALIS_SERVER_URL } from "./variables/general"

const root = ReactDOM.createRoot(document.getElementById("root"))

function App() {
  useGetWalletBalances()
  useGetTokenPrices()

  return (
    <Switch>
      <Route path={`/home`} component={HomeLayout} />
      <Redirect from={`/`} to="/home/dashboard" />
    </Switch>
  )
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <MoralisProvider
          // initializeOnMount={false}
          appId={MORALIS_APP_ID}
          serverUrl={MORALIS_SERVER_URL}
        >
          <App />
        </MoralisProvider>
      </ReduxProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
