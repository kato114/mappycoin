import { CHAIN_ID } from "."

const { BSC_MAINNET, BSC_TESTNET } = CHAIN_ID

export const bscContracts = {
  PRESALE: {
    [BSC_MAINNET]: {
      address: "0x25010cBc2f119c0fca8d1BdF1C4AA49Bb46A47AF",
      explorerUrl:
        "https://bscscan.com/address/0x25010cBc2f119c0fca8d1BdF1C4AA49Bb46A47AF#code",
    },
    [BSC_TESTNET]: {
      address: "0x9693daf4A87f10B04220e6f775381a564b9B548d",
      explorerUrl:
        "https://testnet.bscscan.com/address/0x9693daf4A87f10B04220e6f775381a564b9B548d#code",
    },
  },
  MAPPY: {
    [BSC_MAINNET]: {
      address: "0x161C53F962d1EC1bcd3bE97c4AD792A4765A5b4f",
      explorerUrl:
        "https://bscscan.com/address/0x161C53F962d1EC1bcd3bE97c4AD792A4765A5b4f#code",
    },
    [BSC_TESTNET]: {
      address: "0xe037B4f768aebDa013EE6DE6a5A490D086E08a21",
      explorerUrl:
        "https://testnet.bscscan.com/address/0xe037B4f768aebDa013EE6DE6a5A490D086E08a21#code",
    },
  },
  ROUTER: {
    [BSC_MAINNET]: {
      address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
      explorerUrl:
        "https://bscscan.com/address/0x10ED43C718714eb63d5aA57B78B54704E256024E#code",
    },
    [BSC_TESTNET]: {
      // Bakery Swap Router
      address: "0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F",
      explorerUrl:
        "https://testnet.bscscan.com/address/0xCDe540d7eAFE93aC5fE6233Bee57E1270D3E330F#code",

      // Pancake Swap Router
      // address: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
      // explorerUrl:
      //   "https://testnet.bscscan.com/address/0xD99D1c33F9fC3444f8101754aBC46c52416550D1#code",
    },
  },
  FACTORY: {
    [BSC_MAINNET]: {
      address: "0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73",
      explorerUrl:
        "https://bscscan.com/address/0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73#code",
    },
    [BSC_TESTNET]: {
      // Bakery Swap Factory
      address: "0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7",
      explorerUrl:
        "https://testnet.bscscan.com/address/0x01bF7C66c6BD861915CdaaE475042d3c4BaE16A7#code",

      // Pancake Swap Factory
      // address: "0x6725F303b657a9451d8BA641348b6761A6CC7a17",
      // explorerUrl:
      //   "https://testnet.bscscan.com/address/0x6725F303b657a9451d8BA641348b6761A6CC7a17#code",
    },
  },
}
