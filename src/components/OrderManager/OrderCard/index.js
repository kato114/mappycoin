import { IoWalletOutline, IoStarOutline } from "react-icons/io5"

import { getCurrencyIcon } from "utils/GetCurrencyIcons"
import { makeUnified } from "helpers"

import "./style.scss"

const OrderCard = ({ data }) => (
  <div className="order-card blur-bg shadowed rounded-md grid">
    <img className="rounded-sm" src={data.image[0]} alt="image" />
    <div className="order-card-info flex flex-column">
      <h3>
        {data.name}, {data.location}
      </h3>
      <p>{data.detail && data.detail.join(" | ")}</p>
      <a href="">Detailed information</a>
    </div>
    <div className="order-card-payment flex flex-column">
      <div className="order-card-payment-info">
        <h3>${makeUnified(5000)}</h3>
        <span className="flex">
          ({getCurrencyIcon(data.currency)} {data.price})
        </span>
      </div>
      <div className="order-card-payment-card flex">
        <IoWalletOutline />
        <span>Transfer via card</span>
      </div>
      <div className="order-card-payment-trust flex">
        <IoStarOutline />
        <span>On trust</span>
      </div>
      <div className="order-card-payment-est">
        Est.payment: ${makeUnified(500)}/mo
      </div>
    </div>
    <div className="order-card-button flex">
      <button>Start order</button>
    </div>
  </div>
)

export default OrderCard
