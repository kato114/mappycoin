import { combineReducers } from "redux"

import gasfee from "./Reducers/GasFee"
import swap from "./Reducers/Swap"
import slippage from "./Reducers/Slippage"

const appReducers = combineReducers({
  gasfee,
  swap,
  slippage,
})

export default appReducers
