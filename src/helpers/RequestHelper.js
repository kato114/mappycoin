import { IS_PENDING, IS_SUCCESS, IS_FAILURE } from "redux/Constants"

export const requestPending = (type) => `${type}/${IS_PENDING}`
export const requestSuccess = (type) => `${type}/${IS_SUCCESS}`
export const requestFailure = (type) => `${type}/${IS_FAILURE}`
