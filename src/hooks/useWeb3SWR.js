import { Contract } from "ethers"
import { isAddress } from "ethers/lib/utils"
import useSWR from "swr"
import useActiveWeb3React from "./useActiveWeb3React"
import { getProviderOrSigner } from "utils/index"

import { getERC20Abi } from "helpers/AbiHelper"

// Balance Fetcher & hook
const balanceFetcher =
  (library, abi = []) =>
  async (...args) => {
    const [arg1, arg2, arg3, ...params] = args

    if (isAddress(arg1)) {
      const address = arg1
      const method = arg2
      const account = arg3

      const contract = new Contract(
        address,
        abi,
        getProviderOrSigner(library, account)
      )

      return contract[method](arg3, ...params)
    }

    const method = arg1
    return library[method](arg2, arg3, ...params)
  }

export const useWeb3SWRBalance = (currency) => {
  const { library, account } = useActiveWeb3React()

  const { data: balance, mutate } = useSWR(
    currency.symbol === "BNB"
      ? ["getBalance", account, "latest"]
      : [currency.address, "balanceOf", account],
    {
      fetcher:
        currency.symbol === "BNB"
          ? balanceFetcher(library)
          : balanceFetcher(library, getERC20Abi()),
    }
  )

  return { balance, mutate }
}

// PancakeRouter Method Fetcher & hook
const methodFetcher =
  (library, abi = []) =>
  async (...args) => {
    const [arg1, arg2, arg3, ...params] = args
    const address = arg1
    const method = arg2
    const account = arg3

    const contract = new Contract(
      address,
      abi,
      getProviderOrSigner(library, account)
    )

    return contract[method](...params)
  }

export const useWeb3SWRContract = (address, abi, method, ...params) => {
  const { library, account } = useActiveWeb3React()

  const { data, mutate } = useSWR([address, method, account, ...params], {
    fetcher: methodFetcher(library, abi),
  })

  return { data, mutate }
}
