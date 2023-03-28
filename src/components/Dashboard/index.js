import { Link } from "react-router-dom"
import FadeIn from "react-fade-in/lib/FadeIn"
import { keysIn } from "lodash"

import Slider from "components/Slider"
import WalletButton from "components/WalletButton"

import {
  Logo,
  HomeBanner,
  GreenCircle,
  VaultProtection,
  PortfolioManager,
  ComfortableInterface,
  TimerDecoration,
} from "resources/SVGs"
import {
  EcosystemAd,
  NFTAd,
  NFTOne,
  NFTTwo,
  NFTThree,
  NFTFour,
  NFTFive,
  NFTSix,
  NFTSeven,
  NFTEight,
  WalletBackground,
} from "resources/Images"

import { FaArrowRight } from "react-icons/fa"
import { HiOutlineClock } from "react-icons/hi"

import {
  AppRoutes,
  Tokenomics,
  AsSeenOn,
  Roadmap,
  MappyPros,
} from "constants/UI"

import "./style.scss"

const Dashboard = ({
  startTimeLeft,
  endTimeLeft,
  selectOptions,
  colorStyles,
}) => (
  <div className="dashboard flex flex-column">
    <GreenCircle className="dashboard-decoration-navbar" />
    <FadeIn className="dashboard-wrapper container">
      <div className="dashboard-banner grid">
        <div className="dashboard-banner-info flex flex-column">
          <h1>Welcome to the Pinnacle of Yield Farming, Staking & DeFi!</h1>
          <p>
            With the Masters of Crypto at the helm, Mappy Coin was created for
            the sole purpose of Dominating the Industry!
          </p>
          <div className="dashboard-banner-buttons flex">
            <Link className="flex" to={AppRoutes.PRESALE}>
              Go for Presale
              <FaArrowRight />
            </Link>
            <Link className="flex" to={AppRoutes.DASHBOARD}>
              More Information
            </Link>
          </div>
          <GreenCircle className="dashboard-decoration-info" />
        </div>
        <div className="dashboard-banner-decoration flex">
          <HomeBanner />
        </div>
        <div className="dashboard-banner-asseenon flex">
          {AsSeenOn.map((data, index) => (
            <div key={index} className="dashboard-banner-asseenon-item">
              <a href={data.link}>{data.icon}</a>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-presale grid">
        <div className="dashboard-presale-title flex flex-column">
          <div className="title">
            Seamless Token Distribution in your Wallet!
          </div>
          <p>
            Expert level-Farming Pools, Yield Farming, Staking, DEX, and an
            upcoming P2P Platform, Mappy coin is packed & all set to rule the
            ring!
          </p>
          <Link className="flex" to={AppRoutes.PRESALE}>
            To the Presale <FaArrowRight />
          </Link>
        </div>
        <div className="dashboard-presale-timer flex">
          <GreenCircle />
          <GreenCircle />
          <div className="dashboard-presale-timer-wrapper flex flex-column rounded blur-bg shadowed">
            <TimerDecoration />
            <div className="dashboard-presale-timer-counts grid">
              {keysIn(startTimeLeft).length === 0 ? (
                keysIn(endTimeLeft).length === 0 ? (
                  <>
                    <div className="counter flex flex-column">
                      <div className="flex">
                        <span>?</span>
                        <span>?</span>
                      </div>
                      <span>Day</span>
                    </div>
                    <div className="counter flex flex-column">
                      <div className="flex">
                        <span>?</span>
                        <span>?</span>
                      </div>
                      <span>Hrs</span>
                    </div>
                    <div className="counter flex flex-column">
                      <div className="flex">
                        <span>?</span>
                        <span>?</span>
                      </div>
                      <span>Min</span>
                    </div>
                    <div className="counter flex flex-column">
                      <div className="flex">
                        <span>?</span>
                        <span>?</span>
                      </div>
                      <span>Sec</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="counter flex flex-column">
                      <div className="flex">
                        <span>{endTimeLeft.days[0]}</span>
                        <span>{endTimeLeft.days[1]}</span>
                      </div>
                      <span>Day</span>
                    </div>
                    <div className="counter flex flex-column">
                      <div className="flex">
                        <span>{endTimeLeft.hours[0]}</span>
                        <span>{endTimeLeft.hours[1]}</span>
                      </div>
                      <span>Hrs</span>
                    </div>
                    <div className="counter flex flex-column">
                      <div className="flex">
                        <span>{endTimeLeft.minutes[0]}</span>
                        <span>{endTimeLeft.minutes[1]}</span>
                      </div>
                      <span>Min</span>
                    </div>
                    <div className="counter flex flex-column">
                      <div className="flex">
                        <span>{endTimeLeft.seconds[0]}</span>
                        <span>{endTimeLeft.seconds[1]}</span>
                      </div>
                      <span>Sec</span>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className="counter flex flex-column">
                    <div className="flex">
                      <span>{startTimeLeft.days[0]}</span>
                      <span>{startTimeLeft.days[1]}</span>
                    </div>
                    <span>Day</span>
                  </div>
                  <div className="counter flex flex-column">
                    <div className="flex">
                      <span>{startTimeLeft.hours[0]}</span>
                      <span>{startTimeLeft.hours[1]}</span>
                    </div>
                    <span>Hrs</span>
                  </div>
                  <div className="counter flex flex-column">
                    <div className="flex">
                      <span>{startTimeLeft.minutes[0]}</span>
                      <span>{startTimeLeft.minutes[1]}</span>
                    </div>
                    <span>Min</span>
                  </div>
                  <div className="counter flex flex-column">
                    <div className="flex">
                      <span>{startTimeLeft.seconds[0]}</span>
                      <span>{startTimeLeft.seconds[1]}</span>
                    </div>
                    <span>Sec</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="dashboard-introduce">
        <div className="dashboard-introduce-title">
          Meet our executive leadership
        </div>
        <div className="dashboard-introduce-items grid">
          <div className="item flex flex-column blur-bg shadowed rounded">
            <VaultProtection />
            <span>Vault Protection</span>
            <p>
              Lorem ipsum dolor site amet, consectetur adipicing elit. Aenean
              euismod bibiendum laoreet. Proin gravida dolor sit.
            </p>
          </div>
          <div className="item flex flex-column blur-bg shadowed rounded">
            <PortfolioManager />
            <span>Portfolio manager</span>
            <p>
              Lorem ipsum dolor site amet, consectetur adipicing elit. Aenean
              euismod bibiendum laoreet. Proin gravida dolor sit.
            </p>
          </div>
          <div className="item flex flex-column blur-bg shadowed rounded">
            <ComfortableInterface />
            <span>Comfortable interface</span>
            <p>
              Lorem ipsum dolor site amet, consectetur adipicing elit. Aenean
              euismod bibiendum laoreet. Proin gravida dolor sit.
            </p>
          </div>
        </div>
      </div> */}

      <div className="dashboard-ecosystem grid">
        <GreenCircle />
        <div className="dashboard-ecosystem-title">
          <div className="title">Build your own DeFi ecosystem</div>
          <div className="ad flex rounded">
            <img src={EcosystemAd} alt="ecosystem ad" />
          </div>
        </div>
        <div className="dashboard-ecosystem-detail">
          <div className="detail-wrap flex flex-column shadowed rounded blur-bg">
            <span className="title">defi_intro</span>
            <p>- node_modules</p>
            <p>- .gitignore</p>
            <p>- app.js</p>
            <p>- package-lock.json</p>
            <p>- package.json</p>
            <div className="flex flex-column rounded">
              <p>- node_modules</p>
              <p>- .gitignore</p>
              <p>- app.js</p>
              <p>- package-lock.json</p>
              <p>- package.json</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-about flex flex-column">
        <div className="title">About MappyCoin</div>
        <div className="subtitle">
          Named after the famous Namco game “Mappy”, Mappy Coin takes its roots
          from the arcade universe and transcends it into the Crypto world. With
          Hassle-free token distribution in your wallet, Mappy provides an
          all-new take on Yield Farming & Staking through its unique DEX
          platform.
        </div>
        <Slider />
      </div>

      <div className="dashboard-tokenomics flex flex-column rounded shadowed">
        <Logo />
        <div className="dashboard-tokenomics-title">Tokenomics</div>
        <div className="dashboard-tokenomics-wrapper grid">
          {Tokenomics.map((data, index) => (
            <div
              key={index}
              className="dashboard-tokenomics-item flex flex-column"
            >
              <div className="progress flex shadowed">
                <span>{data.title}</span>
                <div
                  className="bar"
                  style={{ height: `${data.percentage}%` }}
                ></div>
              </div>
              <span>{`${data.percentage}%`}</span>
            </div>
          ))}
        </div>
        <div className="dashboard-tokenomics-info">
          Total Supply : 100 Million
        </div>
      </div>

      {/* <div className="dashboard-nft grid">
        <div className="dashboard-nft-ad flex">
          <img src={NFTAd} alt="nft ad" />
        </div>
        <div className="dashboard-nft-title">
          <div className="title">Unique game with NFT draw</div>
          <p>
            With a mind-blowing P2P project in the works which is expected to
            launch in the 4th quarter of 2022, Mappy Coin planning to do the
            unthinkable. Creating such a diverse but easy to access platform
            where crypto users can actually trade stuff like Real Estate,
            Vehicles, Personal Assets & much more!
          </p>
          <Link to={AppRoutes.COMINGSOON}>
            Play the Game <FaArrowRight />
          </Link>
        </div>
      </div> */}

      {/* <div className="dashboard-marketplace">
        <GreenCircle />
        <GreenCircle />
        <div className="dashboard-marketplace-title flex">
          <span>Meet our executive leadership</span>
          <Select options={selectOptions} styles={colorStyles} />
        </div>
        <div className="dashboard-marketplace-items grid">
          <div className="item flex flex-column rounded blur-bg">
            <img src={NFTOne} alt="nft one" />
            <span>Some metal cap</span>
          </div>
          <div className="item flex flex-column rounded blur-bg">
            <img src={NFTTwo} alt="nft two" />
            <span>Some metal cap</span>
          </div>
          <div className="item flex flex-column rounded blur-bg">
            <img src={NFTThree} alt="nft three" />
            <span>Some metal cap</span>
          </div>
          <div className="item flex flex-column rounded blur-bg">
            <img src={NFTFour} alt="nft four" />
            <span>Some metal cap</span>
          </div>
          <div className="item flex flex-column rounded blur-bg">
            <img src={NFTFive} alt="nft five" />
            <span>Some metal cap</span>
          </div>
          <div className="item flex flex-column rounded blur-bg">
            <img src={NFTSix} alt="nft six" />
            <span>Some metal cap</span>
          </div>
          <div className="item flex flex-column rounded blur-bg">
            <img src={NFTSeven} alt="nft seven" />
            <span>Some metal cap</span>
          </div>
          <div className="item flex flex-column rounded blur-bg">
            <img src={NFTEight} alt="nft eight" />
            <span>Some metal cap</span>
          </div>
        </div>
      </div> */}

      <div className="dashboard-pros container flex flex-column">
        <div className="dashboard-pros-title">
          <h2>Why MappyCoin?</h2>
        </div>
        <div className="dashboard-pros-body grid">
          {MappyPros.map((data, index) => (
            <div
              key={index}
              className="dashboard-pros-body-item rounded-md blur-bg shadowed flex flex-column"
            >
              {data.icon}
              <h3>{data.title}</h3>
              <p>{data.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-roadmap">
        <GreenCircle />
        <div className="dashboard-roadmap-title">
          <h2>Roadmap</h2>
          <span>This Roadmap outlines our future plans</span>
        </div>
        <div className="dashboard-roadmap-body flex flex-column">
          <div className="dashboard-roadmap-body-start flex flex-column blur-bg shadowed rounded">
            <div className="flex">
              <HiOutlineClock />
            </div>
            <p>Q2 2022</p>
            <span>Start the project</span>
          </div>

          {Roadmap.map((data, index) => (
            <div key={index} className="dashboard-roadmap-body-item grid">
              {index % 2 === 0 ? (
                <div></div>
              ) : (
                <div className="dashboard-roadmap-body-item-body flex flex-column blur-bg shadowed rounded">
                  <div
                    className={`indicator-right${
                      data.onGoing || data.achieved ? " active" : ""
                    }`}
                  ></div>
                  <div className="flex">{data.icon}</div>
                  <p>{data.period}</p>
                  <span>{data.title}</span>
                  <div className="roadmap-detail flex flex-column">
                    {data.steps.map((data, index) => (
                      <span
                        key={index}
                        className={`${data.achieved ? "roadmap-achieved" : ""}`}
                      >
                        {data.icon}
                        {data.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <span></span>
              {index % 2 === 0 ? (
                <div className="dashboard-roadmap-body-item-body flex flex-column blur-bg shadowed rounded">
                  <div
                    className={`indicator-left${
                      data.onGoing || data.achieved ? " active" : ""
                    }`}
                  ></div>
                  <div className="flex">{data.icon}</div>
                  <p>{data.period}</p>
                  <span>{data.title}</span>
                  <div className="roadmap-detail flex flex-column">
                    {data.steps.map((data, index) => (
                      <span
                        key={index}
                        className={`${data.achieved ? "roadmap-achieved" : ""}`}
                      >
                        {data.achieved ? data.achievedIcon : data.icon}
                        {data.title}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-wallet">
        <GreenCircle />
        <GreenCircle />
        <div className="dashboard-wallet-wrapper flex flex-column">
          <img src={WalletBackground} alt="wallet background" />
          <div className="dashboard-wallet-title">
            Connect your Wallet and Get Started!
          </div>
          <div className="dashboard-wallet-subtitle">
            With the power of Mappy Coin, you’re all set to dominate. Connect
            your wallet and dive into the vast world of Crypto!
          </div>
          <WalletButton>Connect Now</WalletButton>
        </div>
      </div>
    </FadeIn>
  </div>
)

export default Dashboard
