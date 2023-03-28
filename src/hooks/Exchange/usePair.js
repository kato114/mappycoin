import { useWeb3SWRContract } from "hooks/useWeb3SWR"
import { useTokenSymbol } from "./useBEP20"

import { getPancakeSwapPairAbi } from "helpers/AbiHelper"
import { constants } from "ethers"

const contractAbi = getPancakeSwapPairAbi()

export const useLpPairReserves = (pairAddress) => {
  const contractAddress = pairAddress
  const methodName = "getReserves"

  const { data: reserves } = useWeb3SWRContract(
    contractAddress,
    contractAbi,
    methodName
  )

  if (reserves === undefined) {
    return { reserveOne: constants.Zero, reserveTwo: constants.Zero }
  } else {
    const reserveOne = reserves[0]
    const reserveTwo = reserves[1]

    return { reserveOne, reserveTwo }
  }
}

export const useLpTokenNames = (pairAddress) => {
  const contractAddress = pairAddress
  const methodNameOne = "token0"
  const methodNameTwo = "token1"

  const { data: token0Address } = useWeb3SWRContract(
    contractAddress,
    contractAbi,
    methodNameOne
  )

  const { data: token1Address } = useWeb3SWRContract(
    contractAddress,
    contractAbi,
    methodNameTwo
  )

  const symbolOne = useTokenSymbol(token0Address)
  const symbolTwo = useTokenSymbol(token1Address)

  return { symbolOne, symbolTwo }
}
