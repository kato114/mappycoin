import { createAction, handleActions } from "redux-actions"
import { requestSuccess } from "helpers/RequestHelper"

import {
  DO_SELECT_SWAP_FROM,
  DO_SELECT_SWAP_FROM_SUPPLY,
  DO_SELECT_SWAP_FROM_RESERVE,
  DO_SELECT_SWAP_TO,
  DO_SELECT_SWAP_TO_SUPPLY,
  DO_SELECT_SWAP_TO_RESERVE,
  DO_SWAP_PAIR,
} from "redux/Constants"
import getAsset from "utils/GetAssets"
import { validatePair, injectSupply, injectReserve } from "helpers/AssetHelper"

const getInitialState = () => ({
  status: "init_state",
  pair: [injectSupply(getAsset("BNB"), 0), injectSupply(getAsset("MAPPY"), 0)],
  error: null,
})

export const changePairFromAction = createAction(DO_SELECT_SWAP_FROM)
export const changePairFromSupply = createAction(DO_SELECT_SWAP_FROM_SUPPLY)
export const changePairFromReserve = createAction(DO_SELECT_SWAP_FROM_RESERVE)
export const changePairToAction = createAction(DO_SELECT_SWAP_TO)
export const changePairToSupply = createAction(DO_SELECT_SWAP_TO_SUPPLY)
export const changePairToReserve = createAction(DO_SELECT_SWAP_TO_RESERVE)
export const swapPairAction = createAction(DO_SWAP_PAIR)

export default handleActions(
  {
    [DO_SELECT_SWAP_FROM]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_SELECT_SWAP_FROM),
      pair: validatePair(state, [
        injectSupply(getAsset(payload), 0),
        state.pair[1],
      ]),
    }),
    [DO_SELECT_SWAP_FROM_SUPPLY]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_SELECT_SWAP_FROM),
      pair: validatePair(state, [
        injectSupply(state.pair[0], payload),
        state.pair[1],
      ]),
    }),
    [DO_SELECT_SWAP_FROM_RESERVE]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_SELECT_SWAP_FROM),
      pair: validatePair(state, [
        injectReserve(state.pair[0], payload),
        state.pair[1],
      ]),
    }),
    [DO_SELECT_SWAP_TO]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_SELECT_SWAP_TO),
      pair: validatePair(state, [
        state.pair[0],
        injectSupply(getAsset(payload), 0),
      ]),
    }),
    [DO_SELECT_SWAP_TO_SUPPLY]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_SELECT_SWAP_FROM),
      pair: validatePair(state, [
        state.pair[0],
        injectSupply(state.pair[1], payload),
      ]),
    }),
    [DO_SELECT_SWAP_TO_RESERVE]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DO_SELECT_SWAP_FROM),
      pair: validatePair(state, [
        state.pair[0],
        injectReserve(state.pair[1], payload),
      ]),
    }),
    [DO_SWAP_PAIR]: (state) => ({
      ...state,
      status: requestSuccess(DO_SWAP_PAIR),
      pair: [state.pair[1], state.pair[0]],
    }),
  },
  getInitialState()
)
