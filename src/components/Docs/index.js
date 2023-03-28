import FadeIn from "react-fade-in/lib/FadeIn"

import { GreenCircle } from "resources/SVGs"
import { useState, useEffect } from "react"
import { AboutOne, AboutTwo, AboutThree } from "resources/Images"

import { DocTabs } from "constants/UI"

import "./style.scss"

const Docs = () => {
  const [document, setDocument] = useState("about")
  const [content, setContent] = useState(<></>)

  useEffect(() => {
    switch (document) {
      case "about":
        setContent(about)
        break
      case "tokenomics":
        setContent(tokenomics)
        break
      case "liquidity":
        setContent(liquidity)
        break
      case "farming":
        setContent(farming)
        break
      case "trading":
        setContent(trading)
        break
      default:
        setContent(<></>)
    }
  }, [document])

  return (
    <div className="docs flex flex-column">
      <GreenCircle className="docs-decoration-navbar" />
      <FadeIn className="docs-wrapper container">
        <div className="docs-content grid">
          <div className="docs-content-info flex flex-column">{content}</div>
          <div className="docs-content-tabs blur-bg shadowed flex flex-column">
            {DocTabs.map((data, index) => (
              <div
                key={index}
                onClick={() => {
                  setDocument(data.component)
                }}
                className={`docs-content-tabs-tab${
                  document === data.component ? " selected" : ""
                }`}
              >
                <div
                  className={`docs-content-tabs-tab-highlight${
                    document === data.component ? " highlight-selected" : ""
                  }`}
                ></div>
                {data.title}
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}

const about = (
  <>
    <h1>About MappyCoin</h1>
    <p>
      Named after the famous Namco game “Mappy”, Mappy Coin takes its roots from
      the arcade universe and transcends it into the Crypto world. With
      Hassle-free token distribution in your wallet, Mappy provides an all-new
      take on Yield Farming & Staking through its unique DEX platform.
    </p>
    <img src={AboutOne} alt="About One" />
    <p>
      2022 is all about Metaverse, and Mappy Coin is rooted deep down towards
      that path itself. With Launching a full-scale Staking Pool on BSC in Q2 to
      dominating the Trading Game in Q1, 2023, we are ready to fire into the
      Moon!
    </p>
    <p>
      Talking about the perks, Mappy Coin brings in a whole lot to the table,
      and we are not just limited to the bars of Crypto or even the Metaverse!
      Token CEX Listings, Decentralized Exchanges, P2P Trading Platform, and
      even a P2E Blockchain launch in 2023, you name it and Mappy can do it!
    </p>
    <p>
      And one place where we dominate like no other is making the user feel at
      home. Your one go-to place to achieve it all!
    </p>
  </>
)

const tokenomics = (
  <>
    <h1>About MappyCoin</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <img src={AboutTwo} alt="About Two" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
      gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
      sodales pulvinar tempor.
    </p>
  </>
)

const liquidity = (
  <>
    <h1>Liquidity</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <img src={AboutThree} alt="About Three" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
      gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
      sodales pulvinar tempor.
    </p>
  </>
)

const farming = (
  <>
    <h1>Farming</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <img src={AboutOne} alt="About One" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
      gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
      sodales pulvinar tempor.
    </p>
  </>
)

const trading = (
  <>
    <h1>Trading</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <img src={AboutTwo} alt="About Two" />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor.
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
      bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra
      justo commodo. Proin sodales pulvinar tempor. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin
      gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
      sodales pulvinar tempor.
    </p>
  </>
)

export default Docs
