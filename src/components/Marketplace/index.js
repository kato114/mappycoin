import FadeIn from "react-fade-in/lib/FadeIn"
import { IoEye, IoHeart, IoArrowRedo } from "react-icons/io5"

import { GreenCircle, NFTSample } from "resources/SVGs"
import { ETH } from "resources/Cryptocurrencies"
import "./style.scss"

const Marketplace = () => (
  <div className="marketplace flex flex-column">
    <GreenCircle className="marketplace-decoration-navbar" />
    <FadeIn className="marketplace-wrapper container flex flex-column">
      <div className="marketplace-hero grid">
        <NFTSample className="shadowed rounded blur-bg" />
        <div className="marketplace-hero-info flex flex-column">
          <h1 className="unselectable">
            Star voice with animated character Cats Ethereum Classic
          </h1>
          <div className="marketplace-hero-info-card flex flex-column shadowed rounded-sm blur-bg">
            <div className="marketplace-hero-info-card-title flex">
              <div className="marketplace-hero-info-card-owner flex">
                <span>Owned by </span>
                <span>{"custom_creator"}</span>
              </div>
              <div className="marketplace-hero-info-card-likes flex">
                <IoEye />
                <span>{200} views</span>
                <IoHeart />
                <span>{1} favorite</span>
              </div>
            </div>
            <div className="marketplace-hero-info-card-collection flex">
              <span>custom_collection</span>
            </div>
            <div className="marketplace-hero-info-card-about flex flex-column">
              <span>About</span>
              <p>Star voice with animated character cats ethereum classic</p>
            </div>
            <div className="marketplace-hero-info-card-controls flex">
              <div className="price-wrapper flex flex-column">
                <span>Current Price</span>
                <div className="price flex">
                  <ETH />
                  <span>13</span>
                  <span>{"ETH"}</span>
                </div>
              </div>
              <div className="controllers flex">
                <button className="rounded-sm shadowed">Place a bid</button>
                <button className="rounded-sm shadowed blur-bg">
                  <IoHeart />
                </button>
                <button className="rounded-sm shadowed blur-bg">
                  <IoArrowRedo />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  </div>
)

export default Marketplace
