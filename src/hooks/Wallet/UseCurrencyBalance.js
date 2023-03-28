import { useMemo } from "react"
import getAsset from "utils/GetAssets"

import { getUppercased } from "utils/GetUnifiedString"

const useTokenBalance = (address, tokens) => {
  const token = useMemo(() => getAsset(getUppercased(currency)), [tokens])
}

const useCurrencyBalance = (account, currency) => {
  const tokens = useMemo(() => {
    if (currency && currency !== "") {
      getAsset(getUppercased(currency))
    }
  }, [currency])
}
