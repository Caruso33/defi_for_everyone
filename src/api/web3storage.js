import { Web3Storage } from "web3.storage/dist/bundle.esm.min.js"
import { STORAGE_API_TOKEN } from "../utils/variables"
// import { Web3Storage, Web3File } from 'web3.storage';

const client = new Web3Storage({ token: STORAGE_API_TOKEN })

export async function storeFilesToIPFS(filename, content) {
  try {
    const file = new File([content], filename, { type: "text/plain" })
    const cid = await client.put([file])

    // console.log(cid);
    return cid
  } catch (e) {
    console.error(e)
  }
  return null
}

export async function retrieveFilesFromIPFS(cid) {
  const res = await client.get(cid)

  if (!res || !res.ok || !res.body) {
    console.error("Error retrieving file from IPFS")

    return []
  }

  // console.log(`Got a response! [${res.status}] ${res.statusText}`)

  // console.log("ipfs res", res)
  // console.log("ipfs body", res.body)
  // console.log("ipfs files", await res.files())

  // for (const f of await res.files()) {
  //   console.log(f)
  // }

  const files = await res.files()

  for (const file of files) {
    console.log(`${file.cid}: ${file.name} ${file.type} (${file.size} bytes)

    ${await file.text()}
    `)
  }

  return files
}
