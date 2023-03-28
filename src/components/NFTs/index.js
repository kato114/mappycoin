import { Link } from "react-router-dom"
import FadeIn from "react-fade-in/lib/FadeIn"

import { AppRoutes } from "constants/UI"

import { FaArrowRight } from "react-icons/fa"
import { GreenCircle, NftGame, Marketplace } from "resources/SVGs"
import "./style.scss"

const Nft = () => (
  <div className="nft flex flex-column">
    <GreenCircle className="nft-decoration-navbar" />
    <FadeIn className="nft-wrapper container flex flex-column">
      <h1>Welcome to the crypto world!</h1>
      <p>
        You can play our game and earn NFT tokens, and you can sell your
        creation and buy creations from our users!
      </p>
      <div className="nft-features grid">
        <GreenCircle />
        <GreenCircle />
        <Link
          className="flex flex-column blur-bg shadowed rounded-md"
          to={AppRoutes.GAME}
        >
          <NftGame />
          <div className="flex">
            <span>Nft game</span>
            <FaArrowRight className="rounded-md" />
          </div>
        </Link>
        <Link
          className="flex flex-column blur-bg shadowed rounded-md"
          to={AppRoutes.MARKETPLACE}
        >
          <Marketplace className="rounded-md" />
          <div className="flex">
            <span>Nft marketplace</span>
            <FaArrowRight />
          </div>
        </Link>
      </div>
    </FadeIn>
  </div>
)

export default Nft
