import { useWeb3SWRContract } from "hooks/useWeb3SWR"

import { getERC20Abi } from "helpers/AbiHelper"

const contractAbi = getERC20Abi()

export const useTokenName = (address) => {
  const contractAddress = address
  const methodName = "name"

  const { data: name } = useWeb3SWRContract(
    contractAddress,
    contractAbi,
    methodName
  )

  return name
}

export const useTokenSymbol = (address) => {
  const contractAddress = address
  const methodName = "symbol"

  const { data: symbol } = useWeb3SWRContract(
    contractAddress,
    contractAbi,
    methodName
  )

  return symbol
}
