import { NavLink } from "react-router-dom"
import FadeIn from "react-fade-in/lib/FadeIn"
import { IoSearchOutline } from "react-icons/io5"

import OrderCard from "./OrderCard"
import { GreenCircle } from "resources/SVGs"
import { AppRoutes } from "constants/UI"

import "./style.scss"

const OrderManager = ({ pageCategory, pageOrders }) => (
  <div className="order-manager flex flex-column">
    <GreenCircle className="order-manager-decoration-navbar" />
    <FadeIn className="order-manager-wrapper container flex flex-column">
      <div className="order-manager-title flex flex-column">
        <h1>{pageCategory}</h1>
        <div className="order-manager-title-detail flex">
          <p>
            MappyCoin's P2P trade is a marketplace where people can trade
            anything directly with each other on their own terms, in virtually
            any country
          </p>
          <button>Create a new order</button>
        </div>
      </div>
      <div className="order-manager-main grid">
        <div className="order-manager-main-filter">
          <div className="order-manager-main-filter-wrapper blur-bg shadowed rounded-md flex flex-column">
            <div className="order-manager-input-wrapper flex">
              <input type="text" className="rounded-sm" placeholder="Search" />
              <IoSearchOutline />
            </div>
            <span>
              Choose on{" "}
              <NavLink to={AppRoutes.GMAP_LOCATION}>Google Maps</NavLink>
            </span>
            <p>Price Range</p>
            <div className="order-manager-main-filter-filters grid">
              <input type="text" className="rounded-sm" placeholder="Min" />
              <input type="text" className="rounded-sm" placeholder="Max" />
              <input
                type="text"
                className="rounded-sm order-manager-main-filter-filters-long"
                placeholder="Home Type"
              />
              <input
                type="text"
                className="rounded-sm"
                placeholder="Bedrooms"
              />
              <input
                type="text"
                className="rounded-sm"
                placeholder="Bathrooms"
              />
            </div>
          </div>
        </div>
        <div className="order-manager-main-orders grid">
          {pageOrders.map((data, index) => (
            <OrderCard key={index} data={data} />
          ))}
        </div>
      </div>
    </FadeIn>
  </div>
)

export default OrderManager
