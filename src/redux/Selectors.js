import { get } from "lodash"

export const gasFeeStateSelector = (state) => get(state, "gasfee")
export const swapStateSelector = (state) => get(state, "swap")
export const slippageStateSelector = (state) => get(state, "slippage")
