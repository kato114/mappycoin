import { useState, useEffect } from "react"
import ReactCountryFlag from "react-country-flag"
import { Link } from "react-router-dom"
import { useWeb3React } from "@web3-react/core"
import { useWindowScrollPosition } from "@withvoid/melting-pot"

import { AppRoutes } from "constants/UI"

import WalletButton from "components/WalletButton"

import "./style.scss"

import { FaBars } from "react-icons/fa"
import { Logo } from "resources/SVGs"

const Navbar = ({ onShowSidebarHandler }) => {
  const { account } = useWeb3React()
  const position = useWindowScrollPosition()

  const [code, setCode] = useState("US")
  const [fixedNavbar, setFixedNavbar] = useState(false)

  useEffect(() => {
    if (position.y > 8) {
      setFixedNavbar(true)
    } else {
      setFixedNavbar(false)
    }
  }, [position])

  return (
    <div className={`navbar flex${fixedNavbar === true ? " fixed" : ""}`}>
      <div className="navbar-wrapper navbar-container flex">
        <div className="navbar-logo flex flex-column">
          <Logo />
          <span>MappyCoin</span>
        </div>
        <div className="navbar-anchors">
          <Link to={AppRoutes.DASHBOARD}>Home</Link>
          <Link to={AppRoutes.TRADING}>Trading</Link>
          <Link to={AppRoutes.PRESALE}>Presale</Link>
          <Link to={AppRoutes.EXCHANGE}>Exchange</Link>
          <Link to={AppRoutes.FARM}>Farm</Link>
          <Link to={AppRoutes.STAKE}>Stake</Link>
          <Link to={AppRoutes.NFTs}>NFTs</Link>
          <Link to={AppRoutes.COMINGSOON}>Wallet</Link>
          <Link to={AppRoutes.P2P}>P2P</Link>
          <Link to={AppRoutes.DOCS}>Docs</Link>
          <Link to={AppRoutes.FAQ}>FAQ</Link>
        </div>
        <div className="navbar-buttons flex">
          <div className="navbar-buttons-i18n">
            <button>
              <div className="flex">
                <ReactCountryFlag countryCode={code} aria-label="i18n" svg />
              </div>
            </button>
          </div>
          <div className="navbar-buttons-wallet">
            <WalletButton>
              {account === undefined || account === ""
                ? "Connect"
                : `${account.slice(0, 4)}...${account.slice(-4)}`}
            </WalletButton>
          </div>
          <div className="navbar-buttons-collapse">
            <button onClick={onShowSidebarHandler}>
              <FaBars />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
