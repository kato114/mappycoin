import { useWeb3SWRContract } from "hooks/useWeb3SWR"

import { getPancakeSwapV2RouterAbi } from "helpers/AbiHelper"
import { getContractAddress } from "utils/GetContractInfo"

const contractAbi = getPancakeSwapV2RouterAbi()

export const useRouterGetAmountIn = (amountOut, reserveIn, reserveOut) => {
  const contractAddress = getContractAddress("ROUTER")
  const methodName = "getAmountIn"

  const { data: amountIn } = useWeb3SWRContract(
    contractAddress,
    contractAbi,
    methodName,
    amountOut,
    reserveIn,
    reserveOut
  )

  return amountIn
}

export const useRouterGetAmountOut = (amountIn, reserveIn, reserveOut) => {
  const contractAddress = getContractAddress("ROUTER")
  const methodName = "getAmountOut"

  const { data: amountOut } = useWeb3SWRContract(
    contractAddress,
    contractAbi,
    methodName,
    amountIn,
    reserveIn,
    reserveOut
  )

  return amountOut
}
