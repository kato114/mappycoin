import FadeIn from "react-fade-in/lib/FadeIn"

import { GreenCircle } from "resources/SVGs"
import { TradingBanner, TradingAd, WalletBackground } from "resources/Images"
import "./style.scss"

const Trading = () => (
  <div className="trading flex flex-column">
    <GreenCircle className="dashboard-decoration-navbar" />
    <FadeIn className="trading-wrapper container">
      <div className="trading-banner grid">
        <div className="trading-banner-image">
          <img src={TradingBanner} alt="trading banner" />
        </div>
        <div className="trading-banner-title">
          <h1>Safe and Rapid Crypto Trading!</h1>
          <p>
            Trade your Crypto Currencies or any other Digital Assets for
            probably anything you want! Yes, the distant future of
            Cryptocurrency is bought to life by Mappy Coin.
          </p>
        </div>
      </div>

      <div className="trading-coinprice grid">
        <div className="item flex flex-column">
          <div className="coin flex">
            <span>bitcoin</span>
            <span>BTC</span>
          </div>
          <div className="chart"></div>
          <div className="price-range"></div>
        </div>
        <div className="item flex flex-column">
          <div className="coin flex">
            <span>ethereum</span>
            <span>ETH</span>
          </div>
          <div className="chart"></div>
          <div className="price-range"></div>
        </div>
        <div className="item flex flex-column">
          <div className="coin flex">
            <span>Litecoin</span>
            <span>LTC</span>
          </div>
          <div className="chart"></div>
          <div className="price-range"></div>
        </div>
        <div className="item flex flex-column">
          <div className="coin flex">
            <span>Solana</span>
            <span>Sol</span>
          </div>
          <div className="chart"></div>
          <div className="price-range"></div>
        </div>
      </div>

      <div className="trading-learn">
        <div className="trading-learn-title">How to trade</div>
        <div className="trading-learn-wrapper grid">
          <div className="trading-learn-steps">
            <div className="step">
              <span>
                <span>✔</span> What is cryptocurrency trading?
              </span>
              <p>
                Like the usual Trading, Cryptocurrency trading is speculating on
                Crypto-Price movements with a CFD trading account or buying and
                selling the underlying coins via an exchange.
              </p>
            </div>
            <div className="step">
              <span>
                <span>✔</span> How You Can Start Trading?
              </span>
              <p>
                Well, to start with, you need a CFD account to start with
                Crypto-Trading. And with Mappy, you can skip the queue for KYC
                and get started within seconds!
              </p>
            </div>
          </div>
          <div className="trading-learn-ad">
            <img src={TradingAd} alt="trading ad" />
          </div>
        </div>
      </div>

      <div className="trading-wallet">
        <GreenCircle />
        <GreenCircle />
        <div className="trading-wallet-wrapper flex flex-column">
          <img src={WalletBackground} alt="wallet background" />
          <div className="trading-wallet-title">Start trading now!</div>
          <div className="trading-wallet-subtitle">
            Let’s get the ball rolling with Seamless Crypto-Trading from Mappy
            Coin!
          </div>
          <button>Connect Now</button>
        </div>
      </div>
    </FadeIn>
  </div>
)

export default Trading
