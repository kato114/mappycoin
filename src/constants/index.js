import getAsset from "utils/GetAssets"

export const stakingPools = [
  {
    pair: [
      {
        name: "MAPPY",
        address: getAsset("MAPPY").address,
      },
      {
        name: "BUSD",
        address: getAsset("BUSD").address,
      },
    ],
    apr: 0.005,
  },
  {
    pair: [
      {
        name: "MAPPY",
        address: getAsset("MAPPY").address,
      },
      {
        name: "BNB",
        address: getAsset("BNB").address,
      },
    ],
    apr: 0.005,
  },
]
