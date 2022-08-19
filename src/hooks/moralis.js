import { useEffect } from "react"
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "state/user"

export function useGetWalletBalances() {
  const Web3Api = useMoralisWeb3Api()
  const { account: address, isWeb3Enabled } = useMoralis()

  const dispatch = useDispatch()
  const userState = useSelector((state) => state.user)

  useEffect(() => {
    if (!Web3Api || !address || !isWeb3Enabled) return

    const getNativeBalance = async () => {
      if (!Web3Api?.account?.getNativeBalance) return

      dispatch(userActions.setIsNativeBalanceLoading(true))

      const result = await Web3Api.account.getNativeBalance({ address })
      console.log("Native Balance", result)

      dispatch(userActions.setIsNativeBalanceLoading(false))
      dispatch(userActions.setIsNativeBalanceLoaded(true))

      return result
    }

    const getTokenBalances = async () => {
      if (!Web3Api?.account?.getTokenBalances) return

      dispatch(userActions.setIsTokenBalancesLoading(true))

      const result = await Web3Api.account.getTokenBalances({ address })
      console.log("Token Balances", result)

      dispatch(userActions.setIsTokenBalancesLoading(false))
      dispatch(userActions.setIsTokenBalancesLoaded(true))

      return result
    }

    async function getBalances() {
      if (!userState.address) {
        dispatch(userActions.setAddress(address))
      }

      if (!userState.nativeBalance) {
        if (
          !userState.isNativeBalanceLoading &&
          !userState.isNativeBalanceLoaded
        ) {
          const nativeBalance = await getNativeBalance(Web3Api, address)
          if (nativeBalance)
            dispatch(userActions.setNativeBalance(nativeBalance))
        }
      }

      if (userState.tokenBalances.length === 0) {
        if (
          !userState.isTokenBalancesLoading &&
          !userState.isTokenBalancesLoaded
        ) {
          const tokenBalances = await getTokenBalances(Web3Api, address)
          if (tokenBalances)
            dispatch(userActions.setTokenBalances(tokenBalances))
        }
      }
    }

    getBalances()
  }, [Web3Api, address, isWeb3Enabled, userState, dispatch])
}
