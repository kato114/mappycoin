import Select from "react-select"
import FadeIn from "react-fade-in/lib/FadeIn"

import WalletButton from "components/WalletButton"

import SliderButton from "./SliderButton"
import FarmDetail from "./FarmDetail"

import { GreenCircle } from "resources/SVGs"
import { getCurrencyIcon } from "utils/GetCurrencyIcons"
import "./style.scss"

const Farming = ({ account, selectOptions, colorStyles, stakingPools }) => (
  <div className="farming flex flex-column">
    <GreenCircle className="farming-decoration-navbar" />
    <FadeIn className="farming-wrapper container flex flex-column">
      <div className="farming-title flex">
        <h1>Farms</h1>
        <div className="farming-title-controls flex">
          <span>Sort by</span>
          <Select
            className="farming-title-controls-selector"
            options={selectOptions}
            styles={colorStyles}
          />
          <span>Staked only</span>
          <SliderButton />
          {/* <div className="farming-title-controls-buttons flex rounded-sm blur-bg shadowed">
            <button className="farming-active rounded-sm">MappyCoin</button>
            <button className="rounded-sm">Community Farms</button>
          </div> */}
          <div className="farming-title-controls-buttons flex rounded-sm blur-bg shadowed">
            <button className="farming-active rounded-sm">Active</button>
            <button className="rounded-sm">Finished</button>
          </div>
        </div>
      </div>

      <div className="farming-pool grid">
        {stakingPools.map((data, index) => (
          <div
            key={index}
            className="farming-pool-wrap flex flex-column blur-bg rounded-md shadowed"
          >
            <div className="farming-pool-wrap-statistics flex">
              <span className="pair-info flex">
                {getCurrencyIcon(data.pair[0].name)}
                <span>
                  {data.pair[0].name}/{data.pair[1].name}
                </span>
              </span>
              <span className="apr flex">
                APR: <span>{Number(data.apr) * 100}%</span>
              </span>
            </div>
            <div className="farming-pool-wrap-statistics flex">
              <span className="multiplex flex">
                {getCurrencyIcon(data.pair[1].name)}
                <span className="rounded-md">
                  {Math.pow(1 + data.apr, 365).toFixed(3) * 100} %
                </span>
              </span>
              <span className="tvl flex">
                TVL: <span>${112.22}</span>
              </span>
            </div>
            <div className="farming-pool-wrap-statistics flex"></div>
            <p>
              Rewards in: <span>{`${data.pair[0].name}`}</span>
            </p>
            <div className="farming-pool-wrap-info flex">
              Current increase
              <span>-</span>
            </div>
            <div className="farming-pool-wrap-info flex">
              Next increase
              <span>-</span>
            </div>
            <div className="farming-pool-wrap-info flex">
              Time remaining
              <span>-</span>
            </div>
            <p className="flex">
              {`${data.pair[0].name} earned`}
              <span>{13.0023}</span>
            </p>
            {account === undefined || account === "" ? (
              <WalletButton>Connect Wallet</WalletButton>
            ) : (
              <button>Enable Contract</button>
            )}
            <FarmDetail pair={data.pair} />
          </div>
        ))}
      </div>
    </FadeIn>
  </div>
)

export default Farming
