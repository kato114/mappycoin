import { Link } from "react-router-dom"
import { keysIn } from "lodash"
import { AppRoutes, SocialLinks } from "constants/UI"
import { Logo } from "resources/SVGs"
import "./style.scss"

const Footer = () => (
  <div className="footer flex">
    <div className="footer-wrapper container">
      <div className="footer-info flex flex-column">
        <div className="footer-logo flex flex-column">
          <Logo />
          <span>MappyCoin</span>
        </div>
        <div className="footer-title">
          tremendous and unique cryptocurrency and nft platform
        </div>
        <div className="footer-copyright">© 2022 MappyCoin</div>
      </div>
      <div className="footer-links">
        <div className="footer-about flex flex-column">
          <span>About</span>
          <Link to={AppRoutes.DOCS}>Documentation</Link>
          <Link to={AppRoutes.COMINGSOON}>Privacy Policy</Link>
          <Link to={AppRoutes.COMINGSOON}>Terms of use</Link>
          <Link to={AppRoutes.FAQ}>FAQ</Link>
        </div>
        {/* <div className="footer-nft flex flex-column">
          <span>NFT</span>
          <Link to={AppRoutes.MARKETPLACE}>Marketplace</Link>
          <Link to={AppRoutes.GAME}>Game</Link>
          <Link to={AppRoutes.COMINGSOON}>Collection</Link>
        </div> */}
        <div className="footer-crypto flex flex-column">
          <span>Crypto</span>
          <Link to={AppRoutes.PRESALE}>Presale</Link>
          {/* <Link to={AppRoutes.EXCHANGE}>Exchange</Link> */}
          {/* <Link to={AppRoutes.STAKE}>Stake</Link> */}
          {/* <Link to={AppRoutes.FARM}>Farm</Link> */}
          {/* <Link to={AppRoutes.P2P}>P2P</Link> */}
        </div>
        <div className="footer-follow flex flex-column">
          <span>Follow</span>
          {keysIn(SocialLinks).map((data, index) => (
            <a
              key={index}
              href={SocialLinks[data].link}
              target="_blank"
              rel="noreferrer"
              aria-label={data.toLowerCase()}
            >
              {data}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default Footer
