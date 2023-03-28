import { useState, useEffect } from "react"
import ExchangeComponent from "components/Exchange"
import { useWeb3React } from "@web3-react/core"

import { BigNumber, constants } from "ethers"
import { parseUnits } from "ethers/lib/utils"

import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import {
  swapPairAction,
  changePairFromReserve,
  changePairToReserve,
} from "redux/Reducers/Swap"
import { changeSlippageAction } from "redux/Reducers/Slippage"
import { changeGasfeeAction } from "redux/Reducers/GasFee"
import {
  gasFeeStateSelector,
  swapStateSelector,
  slippageStateSelector,
} from "redux/Selectors"

import { useFactoryPairAddress } from "hooks/Exchange/useFactory"
import { useLpPairReserves, useLpTokenNames } from "hooks/Exchange/usePair"

const Exchange = ({
  gasfee,
  swap,
  slippage: { slippage },
  changeGasfeeAction,
  swapPairAction,
  changeSlippageAction,
  changePairFromReserve,
  changePairToReserve,
}) => {
  const { account } = useWeb3React()

  const [active, setActive] = useState("swap")
  const [onCustomSlippage, setOnCustomSlippage] = useState(false)

  const pairAddress = useFactoryPairAddress(
    swap.pair[0].address,
    swap.pair[1].address
  )
  const { symbolOne, symbolTwo } = useLpTokenNames(pairAddress)
  const { reserveOne, reserveTwo } = useLpPairReserves(pairAddress)

  useEffect(() => {
    let pairOne = [...swap.pair][0].symbol
    if (pairOne === "BNB") {
      pairOne = "WBNB"
    }
    let realReserveOne, realReserveTwo

    if (pairOne === symbolOne) {
      realReserveOne = reserveOne
      realReserveTwo = reserveTwo
    } else if (pairOne === symbolTwo) {
      realReserveOne = reserveTwo
      realReserveTwo = reserveOne
    } else {
      realReserveOne = constants.Zero
      realReserveTwo = constants.Zero
    }

    changePairFromReserve(realReserveOne)
    changePairToReserve(realReserveTwo)
  }, [symbolOne, symbolTwo, reserveOne, reserveTwo])

  const onChangeActive = (e) => {
    const mode = e.target.name

    setActive(mode)
  }

  const onValidateSlippage = () => {
    if (slippage > 49) {
      if (slippage / 10 > 0) {
        changeSlippageAction(parseInt(slippage / 10))
      }
    }
  }

  const onSlippageChange = (e) => {
    setOnCustomSlippage(false)

    const value = e.target.value

    if (parseFloat(value) !== 0) {
      changeSlippageAction(parseFloat(value))
    } else {
      changeSlippageAction(parseFloat(value))
    }
  }

  const onCustomSlippageChange = (e) => {
    let value = e.target.value

    if (value > 100) {
      value = parseInt(value / 10)
    }

    if (parseFloat(value) !== 0) {
      changeSlippageAction(parseFloat(value))
    } else {
      changeSlippageAction(parseFloat(value))
    }
  }

  const onEnterCustomSlippage = () => {
    setOnCustomSlippage(true)
  }

  return (
    <ExchangeComponent
      wallet={account}
      active={active}
      pair={swap.pair}
      gasfee={gasfee.gasfee}
      slippage={slippage}
      onCustomSlippage={onCustomSlippage}
      onChangeActive={onChangeActive}
      // Reducers
      changeGasfeeAction={changeGasfeeAction}
      swapPairAction={swapPairAction}
      // Slippage
      onSlippageChange={onSlippageChange}
      onCustomSlippageChange={onCustomSlippageChange}
      onEnterCustomSlippage={onEnterCustomSlippage}
      onValidateSlippage={onValidateSlippage}
    />
  )
}

const mapStateToProps = createStructuredSelector({
  gasfee: gasFeeStateSelector,
  swap: swapStateSelector,
  slippage: slippageStateSelector,
})

const mapDispatchToProps = {
  changeGasfeeAction,
  swapPairAction,
  changeSlippageAction,
  changePairFromReserve,
  changePairToReserve,
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
