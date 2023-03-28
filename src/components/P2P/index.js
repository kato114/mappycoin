import { NavLink, Outlet } from "react-router-dom"
import FadeIn from "react-fade-in/lib/FadeIn"

import CategoryCardImage from "./CategoryCardImage"
import P2P_Categories from "constants/UI/P2PCategories"

import { AppRoutes } from "constants/UI"
import { GreenCircle } from "resources/SVGs"

import "./style.scss"

const P2P = () => (
  <div className="p2p flex flex-column">
    <GreenCircle className="p2p-decoration-navbar" />
    <FadeIn className="p2p-wrapper container flex flex-column">
      <div className="p2p-title flex">
        <h1 className="unselectable">Buy and Sell from anywhere</h1>
        <p className="unselectable">
          MappyCoin's P2P trade is a marketplace where people can trade anything
          directly with each other on their own terms, in virtually any country
        </p>
      </div>
      <div className="p2p-categories grid">
        {P2P_Categories.map((data, index) => (
          <NavLink
            key={index}
            className="p2p-categories-card flex flex-column blur-bg shadowed rounded-md"
            to={`${AppRoutes.P2P}/${data.title
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            <CategoryCardImage
              className="p2p-categories-card-image rounded-md flex"
              img={data.image}
            ></CategoryCardImage>
            <div className="p2p-categories-card-title">
              {String(data.title).toUpperCase()}
            </div>
          </NavLink>
        ))}
      </div>
      <Outlet />
    </FadeIn>
  </div>
)

export default P2P
