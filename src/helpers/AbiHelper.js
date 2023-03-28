import ERC20Abi from "configurations/abis/Generated/ERC20.json"
import MappyTokenAbi from "configurations/abis/Generated/Mappy.json"
import MappyIcoAbi from "configurations/abis/Generated/MappyPresale.json"

import PancakeSwapRouterAbi from "configurations/abis/Imported/PancakeswapV2Router.json"
import PancakeSwapFactoryAbi from "configurations/abis/Imported/PancakeswapV2Factory.json"
import PancakeSwapPairAbi from "configurations/abis/Imported/PancakeswapPair.json"

// Generated ABIs
export const getERC20Abi = () => ERC20Abi.abi
export const getMappyTokenAbi = () => MappyTokenAbi.abi
export const getMappyIcoAbi = () => MappyIcoAbi.abi

// Imported ABIs
export const getPancakeSwapV2RouterAbi = () => PancakeSwapRouterAbi
export const getPancakeSwapV2FactoryAbi = () => PancakeSwapFactoryAbi
export const getPancakeSwapPairAbi = () => PancakeSwapPairAbi
