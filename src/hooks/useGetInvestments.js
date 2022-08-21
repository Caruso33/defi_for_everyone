import { useDispatch, useSelector } from "react-redux"
import { retrieveFilesFromIPFS } from "../api/web3storage"
import { investmentActions } from "../state/investment"
import { LOCAL_STORAGE_INVESTMENTS_CID_KEY } from "../utils/variables"

const { useEffect } = require("react")

export default function useGetInvestments() {
  const investments = useSelector((state) => state.investment.investments)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getPrevInvestments() {
      const cid = localStorage.getItem(LOCAL_STORAGE_INVESTMENTS_CID_KEY)

      if (cid && investments.length === 0) {
        console.log("Reading investments from IPFS", cid)

        try {
          const files = await retrieveFilesFromIPFS(cid)

          if (files.length > 0) {
            const content = await files[0].text()

            const prevInvestments = JSON.parse(content)

            if (prevInvestments) {
              console.dir("prevInvestments", prevInvestments)
              dispatch(investmentActions.setInvestments(prevInvestments))
            }
          }
        } catch (e) {
          console.error(e.message)
        }
      }
    }

    getPrevInvestments()
  }, [dispatch, investments.length])
}
