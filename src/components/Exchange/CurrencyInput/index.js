import { useState, useEffect } from "react"
import Modal from "components/Modal"
import { keysIn } from "lodash"
import { useWeb3React } from "@web3-react/core"
import { BigNumber, constants, ethers } from "ethers"
import { parseUnits } from "ethers/lib/utils"

import { useWeb3SWRBalance } from "hooks/useWeb3SWR"
import {
  useRouterGetAmountIn,
  useRouterGetAmountOut,
} from "hooks/Exchange/useRouters"

import { connect } from "react-redux"
import {
  changePairFromAction,
  changePairFromSupply,
  changePairToAction,
  changePairToSupply,
} from "redux/Reducers/Swap"
import { getCurrencyIcon } from "utils/GetCurrencyIcons"

import {
  IoChevronDown,
  IoCloseOutline,
  IoSearchOutline,
  IoSyncOutline,
} from "react-icons/io5"
import { getDefaultCurrencies } from "utils/GetAssets"

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)

const CurrencyInput = ({
  first,
  currency,
  pairInfo,
  changePairFromAction,
  changePairFromSupply,
  changePairToAction,
  changePairToSupply,
}) => {
  const { account, library } = useWeb3React()
  const { balance, mutate } = useWeb3SWRBalance(currency)

  const [modalIsOpen, setModalOpen] = useState(false)
  const [filter, setFilter] = useState("")

  // const amountIn = useRouterGetAmountIn(
  //   parseUnits(currency.supply.toString(), currency.decimal).toString(),
  //   pairInfo[0].reserve.toString(),
  //   pairInfo[1].reserve.toString()
  // )

  // console.log(amountIn === undefined ? amountIn : amountIn.toString())

  useEffect(() => {
    currency.symbol === "BNB"
      ? console.log("Listening for blocks...")
      : console.log("Listening for Transfer...")

    if (library) {
      if (currency.symbol === "BNB") {
        library.on("block", () => {
          console.log("Updating balance...")
          mutate(undefined, true)
        })
      }
    }

    return () => {
      library && library.removeAllListeners("block")
    }
  }, [])

  const onChangeFilter = (e) => {
    let value = e.target.value

    setFilter(value)
  }

  const onChangeSupply = (e) => {
    let supply = Number(e.target.value)

    if (balance === undefined) {
      return
    }

    if (first) {
      changePairFromSupply(supply)
    } else {
      changePairToSupply(supply)
    }
  }

  const onClickBalance = () => {
    const inputBalance = parseFloat(
      ethers.utils.formatUnits(balance, currency.decimal)
    )

    if (balance) {
      if (first) {
        changePairFromSupply(inputBalance)
      } else {
        changePairToSupply(inputBalance)
      }
    }
  }

  const openModal = () => {
    setModalOpen(true)

    setFilter("")
  }

  const afterOpenModal = () => {}

  const closeModal = () => {
    setModalOpen(false)
  }

  return (
    <div className="exchange-main-card-cryptocurrency-input rounded-sm grid">
      <span className="unselectable">{first ? "From" : "To"}</span>
      <span className="flex unselectable" onClick={onClickBalance}>
        <span>Balance:</span>
        {account ? (
          balance ? (
            <>
              <span>
                {parseFloat(
                  ethers.utils.formatUnits(balance, currency.decimal)
                ).toFixed(4)}{" "}
                {currency.symbol}
              </span>
            </>
          ) : (
            <IoSyncOutline />
          )
        ) : (
          <span>_ {currency.symbol}</span>
        )}
      </span>
      <input
        type="number"
        placeholder="0.0"
        value={currency.supply.toString()}
        onChange={(e) => {
          onChangeSupply(e)
        }}
      />
      <button className="flex" onClick={openModal}>
        {getCurrencyIcon(currency.symbol)} {currency.symbol} <IoChevronDown />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Select Currency"
        ariaHideApp={false}
      >
        <div className="modal-header flex">
          <h3>Select Cryptocurrency</h3>
          <IoCloseOutline onClick={closeModal} />
        </div>
        <div className="modal-search flex">
          <div className="flex">
            <input
              type="text"
              className="shadowed rounded-sm"
              placeholder="Search Coins"
              onChange={(e) => onChangeFilter(e)}
            />
            <IoSearchOutline />
          </div>
        </div>
        {keysIn(getDefaultCurrencies())
          .filter(
            (data) => data.toLowerCase().includes(filter) || filter === ""
          )
          .map((data, index) => (
            <div
              key={index}
              className="exchange-main-card-cryptocurrency-input-currency rounded-sm flex"
              onClick={() => {
                if (first) {
                  changePairFromAction(data)
                } else {
                  changePairToAction(data)
                }

                closeModal()
              }}
            >
              {getCurrencyIcon(data)}
              <div className="exchange-main-card-cryptocurrency-input-currency-info flex flex-column">
                <span>{getDefaultCurrencies()[data][chainId].symbol}</span>
                <span>{getDefaultCurrencies()[data][chainId].name}</span>
              </div>
            </div>
          ))}
      </Modal>
    </div>
  )
}

const mapDispatchToProps = {
  changePairFromAction,
  changePairFromSupply,
  changePairToAction,
  changePairToSupply,
}

export default connect(null, mapDispatchToProps)(CurrencyInput)
