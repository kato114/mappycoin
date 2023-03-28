import { createAction, handleActions } from "redux-actions"
import { requestSuccess } from "helpers/RequestHelper"

import { DO_CHANGE_SLIPPAGE } from "redux/Constants"

const getInitialState = () => ({
  status: "init_state",
  slippage: 0.5,
})

export const changeSlippageAction = createAction(DO_CHANGE_SLIPPAGE)

export default handleActions(
  {
    [DO_CHANGE_SLIPPAGE]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_CHANGE_SLIPPAGE),
      slippage: payload,
    }),
  },
  getInitialState()
)
