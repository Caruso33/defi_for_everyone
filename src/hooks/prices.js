import { ethers } from "ethers"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTokenInfo } from "../api/ethplorer"
import { tokenActions } from "../state/token"
import _isEmpty from "lodash/isEmpty"

export function useGetTokenPrices() {
  const userState = useSelector((state) => state.user)
  const tokensState = useSelector((state) => state.tokens)

  const dispatch = useDispatch()

  useEffect(() => {
    async function getEthInfo() {
      dispatch(tokenActions.setIsNativeTokenLoading(true))

      const { data: ethInfo } = await getTokenInfo(ethers.constants.AddressZero)
      console.log("Eth Info", ethInfo)

      dispatch(tokenActions.setNativeToken(ethInfo))

      dispatch(tokenActions.setIsNativeTokenLoading(false))
      dispatch(tokenActions.setIsNativeTokenLoaded(true))
    }

    async function getTokensInfo() {
      dispatch(tokenActions.setIsTokensLoading(true))

      const tokensInfo = []

      for (const token of userState.tokenBalances) {
        const { data: tokenInfo } = await getTokenInfo(token.token_address)
        console.log("Token Info", tokenInfo)

        tokensInfo.push(tokenInfo)
      }

      dispatch(tokenActions.setTokens(tokensInfo))

      dispatch(tokenActions.setIsTokensLoading(false))
      dispatch(tokenActions.setIsTokensLoaded(true))
    }

    if (_isEmpty(tokensState.nativeToken) && userState.nativeBalance) {
      if (!tokensState.isNativeTokenLoading && !tokensState.isNativeTokenLoaded) {
        getEthInfo()
      }
    }

    if (tokensState.tokens.length === 0 && userState.tokenBalances.length > 0) {
      if (!tokensState.isTokensLoading && !tokensState.isTokensLoaded) {
        getTokensInfo()
      }
    }
  }, [userState, tokensState, dispatch])
}
