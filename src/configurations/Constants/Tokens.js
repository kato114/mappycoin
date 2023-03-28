import { CHAIN_ID } from "."

const { BSC_MAINNET, BSC_TESTNET } = CHAIN_ID

export const bscTokens = {
  MAPPY: {
    [BSC_MAINNET]: {
      name: "Mappy Coin",
      symbol: "MAPPY",
      decimal: 18,
      address: "0x161C53F962d1EC1bcd3bE97c4AD792A4765A5b4f",
      projectUrl: "https://www.mappycoin.com/",
    },
    [BSC_TESTNET]: {
      name: "Mappy Coin",
      symbol: "MAPPY",
      decimal: 18,
      address: "0xe037B4f768aebDa013EE6DE6a5A490D086E08a21",
      projectUrl: "https://www.mappycoin.com/",
    },
  },
  BNB: {
    [BSC_MAINNET]: {
      name: "BNB",
      symbol: "BNB",
      decimal: 18,
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      projectUrl: "https://www.binance.com/",
    },
    [BSC_TESTNET]: {
      name: "BNB",
      symbol: "BNB",
      decimal: 18,
      address: "0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F",
      projectUrl: "https://www.binance.com/",
    },
  },
  WBNB: {
    [BSC_MAINNET]: {
      name: "Wrapped BNB",
      symbol: "WBNB",
      decimal: 18,
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      projectUrl: "https://www.binance.com/",
    },
    [BSC_TESTNET]: {
      name: "Wrapped BNB",
      symbol: "WBNB",
      decimal: 18,
      address: "0xaE8E19eFB41e7b96815649A6a60785e1fbA84C1e",
      projectUrl: "https://www.binance.com/",
    },
  },
  USDT: {
    [BSC_MAINNET]: {
      name: "Tether USD",
      symbol: "USDT",
      decimal: 18,
      address: "0x55d398326f99059fF775485246999027B3197955",
      projectUrl: "https://tether.to/",
    },
    [BSC_TESTNET]: {
      name: "Tether USD",
      symbol: "USDT",
      decimal: 18,
      address: "0x55d398326f99059fF775485246999027B3197955",
      projectUrl: "https://tether.to/",
    },
  },
  BUSD: {
    [BSC_MAINNET]: {
      name: "Binance USD",
      symbol: "BUSD",
      decimal: 18,
      address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      projectUrl: "https://www.paxos.com/busd/",
    },
    [BSC_TESTNET]: {
      name: "Binance USD",
      symbol: "BUSD",
      decimal: 18,
      address: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
      projectUrl: "https://www.paxos.com/busd/",
    },
  },
}
