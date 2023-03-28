import { createAction, handleActions } from "redux-actions"
import { requestSuccess } from "helpers/RequestHelper"

import { DO_CHANGE_GASFEE } from "redux/Constants"

const getInitialState = () => ({
  status: "init_state",
  gasfee: 5,
})

export const changeGasfeeAction = createAction(DO_CHANGE_GASFEE)

export default handleActions(
  {
    [DO_CHANGE_GASFEE]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_CHANGE_GASFEE),
      gasfee: payload,
    }),
  },
  getInitialState()
)
