export const validatePair = (state, pair) => {
  if (pair[0].name === pair[1].name) {
    return state.pair
  } else {
    return pair
  }
}

export const injectSupply = (pairData, supply) => {
  if (typeof pairData === "object" && typeof supply === "number") {
    pairData.supply = Number(supply)
  }

  return pairData
}

export const injectReserve = (pairData, reserve) => {
  if (typeof pairData === "object") {
    pairData.reserve = reserve
  }

  return pairData
}
