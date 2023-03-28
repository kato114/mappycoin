import {
  BscScanIcon,
  BscChainIcon,
  CoinGeckoIcon,
  dappRadarIcon,
  TrustWalletIcon,
} from "resources/AsSeenOn"
import { bscContracts } from "configurations/Constants/Contracts"

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

const AsSeenOn = [
  {
    icon: <BscScanIcon />,
    link: bscContracts.MAPPY[chainId].explorerUrl,
  },
  {
    icon: <BscChainIcon />,
    link: "https://www.binance.com/",
  },
]

export default AsSeenOn
