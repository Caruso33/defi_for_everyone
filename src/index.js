import React from "react"
import ReactDOM from "react-dom/client"
import { MoralisProvider } from "react-moralis"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import "./index.css"
import HomeLayout from "./layouts/HomeLayout.js"
import reportWebVitals from "./reportWebVitals"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MoralisProvider initializeOnMount={false}>
        <Switch>
          <Route path={`/home`} component={HomeLayout} />
          <Redirect from={`/`} to="/home/dashboard" />
        </Switch>
      </MoralisProvider>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
