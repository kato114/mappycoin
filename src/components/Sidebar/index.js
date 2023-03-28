import { Link } from "react-router-dom"
import { keysIn } from "lodash"
import {
  FaReddit,
  FaTwitter,
  FaFacebook,
  FaMedium,
  FaTelegram,
  FaDiscord,
} from "react-icons/fa"
import { AppRoutes, SocialLinks } from "constants/UI"

import "./style.scss"

const Sidebar = ({ showSidebar, onShowSidebarHandler }) => (
  <div
    className={`sidebar${showSidebar ? " show" : ""} flex`}
    onClick={onShowSidebarHandler}
  >
    <div className="sidebar-wrapper container flex flex-column">
      <span>Menu</span>
      <div className="sidebar-links flex flex-column">
        <Link onClick={onShowSidebarHandler} to={AppRoutes.DASHBOARD}>
          Home
        </Link>
        <Link onClick={onShowSidebarHandler} to={AppRoutes.PRESALE}>
          Presale
        </Link>
        {/* <Link onClick={onShowSidebarHandler} to={AppRoutes.TRADING}>
          Trading
        </Link> */}
        {/* <Link onClick={onShowSidebarHandler} to={AppRoutes.EXCHANGE}>
          Exchange
        </Link> */}
        <Link onClick={onShowSidebarHandler} to={AppRoutes.DOCS}>
          Docs
        </Link>
        <Link onClick={onShowSidebarHandler} to={AppRoutes.FAQ}>
          FAQ
        </Link>
        {/* <Link onClick={onShowSidebarHandler} to={AppRoutes.EXCHANGE}>
          Wallet
        </Link> */}
        {/* <Link onClick={onShowSidebarHandler} to={AppRoutes.STAKE}>
          Stake
        </Link> */}
        {/* <Link onClick={onShowSidebarHandler} to={AppRoutes.FARM}>
          Farm
        </Link> */}
        {/* <Link onClick={onShowSidebarHandler} to={AppRoutes.NFTs}>
          NFTs
        </Link> */}
        {/* <Link onClick={onShowSidebarHandler} to={AppRoutes.P2P}>
          P2P
        </Link> */}
      </div>
      <div className="sidebar-socials flex">
        {keysIn(SocialLinks).map((data, index) => (
          <a
            key={index}
            className="flex"
            href={SocialLinks[data].link}
            target="_blank"
            rel="noreferrer"
            aria-label={data.toLowerCase()}
          >
            {SocialLinks[data].icon}
          </a>
        ))}
      </div>
    </div>
  </div>
)

export default Sidebar
