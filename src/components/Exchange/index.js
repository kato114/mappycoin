import { useState } from "react"
import { keysIn } from "lodash"
import { GreenCircle } from "resources/SVGs"
import {
  IoSwapVerticalOutline,
  IoSwapHorizontalOutline,
  IoSettings,
  IoCloseOutline,
} from "react-icons/io5"
import FadeIn from "react-fade-in/lib/FadeIn"

import Modal from "components/Modal"

import WalletButton from "components/WalletButton"
import CurrencyInput from "./CurrencyInput"

import DefaultSlippage from "configurations/Slippages"
import DefaultGasFee from "configurations/GasFees"

import { getLowercased } from "utils/GetUnifiedString"

import "./style.scss"

const Exchange = ({
  wallet,
  active,
  pair,
  gasfee,
  slippage,
  onCustomSlippage,
  onChangeActive,
  priceImpact = 0.002,
  // Reducers
  changeGasfeeAction,
  swapPairAction,
  onChangeRateOrder,
  // Slippage
  onSlippageChange,
  onCustomSlippageChange,
  onEnterCustomSlippage,
  onValidateSlippage,
  ...restProps
}) => {
  const [modalIsOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const afterOpenModal = () => {}

  const closeModal = () => {
    setModalOpen(false)
  }

  const generatePairUI = (pair, swapPairAction) => (
    <>
      <CurrencyInput
        key={pair[0].symbol}
        first
        currency={{ ...pair[0] }}
        pairInfo={[...pair]}
      />
      <div
        className="exchange-main-card-swapper flex shadowed"
        onClick={swapPairAction}
      >
        <IoSwapVerticalOutline />
      </div>
      <CurrencyInput
        key={pair[1].symbol}
        currency={{ ...pair[1] }}
        pairInfo={[...pair]}
      />
    </>
  )

  return (
    <div className="exchange flex flex-column" {...restProps}>
      <GreenCircle className="exchange-decoration-navbar" />
      <FadeIn className="exchange-wrapper container">
        <div className="exchange-main flex flex-column">
          <div className="exchange-main-selector grid">
            <button
              name="swap"
              className={active === "swap" ? "exchange-active" : ""}
              onClick={onChangeActive}
            >
              Swap
            </button>
            <button
              name="liquidity"
              className={active === "liquidity" ? "exchange-active" : ""}
              onClick={onChangeActive}
            >
              Liquidity
            </button>
            <GreenCircle />
            <GreenCircle />
          </div>
          <div className="exchange-main-card flex flex-column shadowed blur-bg rounded-md">
            <div className="exchange-main-card-title flex">
              <div>
                <h3>{active}</h3>
                <span>
                  {getLowercased(active) === "swap"
                    ? "Trade tokens in an instant"
                    : getLowercased(active) === "liquidity"
                    ? "Remove liquidity to receive tokens back"
                    : ""}
                </span>
              </div>
              <IoSettings onClick={openModal} />
            </div>
            {active === "swap" ? (
              <>
                {generatePairUI(pair, swapPairAction)}
                {wallet !== undefined && wallet !== "" && (
                  <div className="exchange-main-card-price flex">
                    <p>
                      Price{" "}
                      <span>
                        <span>{0}</span> {pair[0].symbol}
                      </span>{" "}
                      per <span>{pair[1].symbol}</span>
                    </p>
                    <IoSwapHorizontalOutline onClick={onChangeRateOrder} />
                  </div>
                )}
                <div className="exchange-main-card-button flex">
                  {wallet === undefined || wallet === "" ? (
                    <WalletButton>Connect Wallet</WalletButton>
                  ) : (
                    <button>Trade</button>
                  )}
                </div>
              </>
            ) : active === "liquidity" ? (
              <>
                <h4>No liquidity found</h4>
                <h4>Don't see a pool you joined?</h4>
                <div className="exchange-main-card-liquidity-buttons flex">
                  <button>Find other LP tokens</button>
                  <button>Add Liquidity</button>
                </div>
              </>
            ) : (
              <>
                <div>Error</div>
              </>
            )}
          </div>
          {active === "swap" && wallet !== undefined && wallet !== "" && (
            <div className="exchange-main-detail flex flex-column shadowed blur-bg rounded-sm">
              <p className="flex">
                <span>Minimum Received:</span>
                <span>
                  {pair[1].supply * (1 - priceImpact)} {pair[1].symbol}
                </span>
              </p>
              <p className="flex">
                <span>Price Impact:</span>
                <span className="">{Number(priceImpact)}%</span>
              </p>
              <p className="flex">
                <span>Liquidity Provider Fee</span>
                <span>
                  {pair[0].supply.toPrecision(1) * 0.002} {pair[0].symbol}
                </span>
              </p>
              <p className="flex">
                <span>RFI</span>
                <span>1%</span>
              </p>
            </div>
          )}
        </div>
      </FadeIn>

      {/**
       * SLIPPAGE MODAL
       */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Exchange Setting"
        ariaHideApp={false}
      >
        <div className="modal-header flex">
          <h3 onClick={onValidateSlippage}>Settings</h3>
          <IoCloseOutline onClick={closeModal} />
        </div>
        <h4>Default Transaction Speed(GWEI)</h4>
        <div className="exchange-gasfee grid">
          {keysIn(DefaultGasFee).map((data, index) => (
            <button
              key={index}
              className={`${
                Number(gasfee) === Number(DefaultGasFee[data])
                  ? "gasfee-active "
                  : ""
              }rounded-sm blur-bg shadowed`}
              onClick={() => changeGasfeeAction(Number(DefaultGasFee[data]))}
            >
              {data} {DefaultGasFee[data]}
            </button>
          ))}
        </div>
        <h4 onClick={onValidateSlippage}>Slippage Tolerance</h4>
        <div className="exchange-slippages grid" onClick={onValidateSlippage}>
          {DefaultSlippage.map((data, index) => (
            <button
              key={index}
              className={`${
                slippage === data
                  ? onCustomSlippage === true
                    ? ""
                    : "slippage-active "
                  : ""
              }rounded-sm blur-bg shadowed`}
              value={data}
              onClick={(e) => onSlippageChange(e)}
            >
              {data}%
            </button>
          ))}
          {onCustomSlippage === true ? (
            <div className="flex flex-column">
              <div
                className={`${
                  slippage > 5
                    ? slippage > 49
                      ? "slippage-danger "
                      : "slippage-warning "
                    : "slippage-active "
                }rounded-sm blur-bg shadowed flex`}
              >
                <input
                  type="number"
                  min={1}
                  max={99}
                  step={1}
                  maxLength={2}
                  pattern="^[1-9][0-9]?$|^100$"
                  autoFocus
                  value={slippage.toString()}
                  onChange={(e) => onCustomSlippageChange(e)}
                />
                %
              </div>
              {slippage > 5 &&
                (slippage > 49 ? (
                  <span className="slippage-alert-danger">
                    Enter a valid slippage percentage
                  </span>
                ) : (
                  <span className="slippage-alert-warning">
                    Your transaction may be frontrun
                  </span>
                ))}
            </div>
          ) : (
            <button
              className={`${
                slippage === 0 ? "slippage-active " : ""
              }rounded-sm blur-bg shadowed flex`}
              onClick={onEnterCustomSlippage}
            >
              Custom
            </button>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default Exchange
