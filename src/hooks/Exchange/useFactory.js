import { useWeb3SWRContract } from "hooks/useWeb3SWR"

import { getContractAddress } from "utils/GetContractInfo"
import { getPancakeSwapV2FactoryAbi } from "helpers/AbiHelper"

const contractAbi = getPancakeSwapV2FactoryAbi()

export const useFactoryPairAddress = (addressOne, addressTwo) => {
  const contractAddress = getContractAddress("FACTORY")
  const methodName = "getPair"

  const { data: pairAddress } = useWeb3SWRContract(
    contractAddress,
    contractAbi,
    methodName,
    addressOne,
    addressTwo
  )

  return pairAddress
}
