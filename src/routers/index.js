import { useState, useEffect } from "react"
import { useRoutes } from "react-router-dom"
import { useWindowSize } from "@withvoid/melting-pot"

import Navbar from "components/Navbar"
import Footer from "components/Footer"
import Sidebar from "components/Sidebar"
import SocialIcons from "components/SocialIcons"
import GMap from "components/GMap"

import NotFound from "components/NotFound"
import ComingSoon from "components/ComingSoon"

import Dashboard from "./Dashboard"
import Trading from "./Trading"
import Exchange from "./Exchange"
import Nft from "./NFTs"
import Game from "./Game"
import Marketplace from "./Marketplace"
import Staking from "./Staking"
import Farming from "./Farming"
import P2P from "./P2P"
import OrderManager from "./P2P/OrderManager"
import Presale from "./Presale"
import Docs from "./Docs"
import Faq from "./FAQ"

import UseScrollToTop from "hooks/useScrollToTop"

import { AppRoutes } from "constants/UI"

const AppRouter = () => {
  const { width } = useWindowSize()

  const [showSidebar, setShowSidebar] = useState(false)

  let routes = useRoutes([
    { path: AppRoutes.DASHBOARD, element: <Dashboard /> },
    { path: AppRoutes.TRADING, element: <Trading /> },
    { path: AppRoutes.EXCHANGE, element: <Exchange /> },
    { path: AppRoutes.NFTs, element: <Nft /> },
    { path: AppRoutes.MARKETPLACE, element: <Marketplace /> },
    { path: AppRoutes.STAKE, element: <Staking /> },
    { path: AppRoutes.FARM, element: <Farming /> },
    { path: AppRoutes.GAME, element: <Game /> },
    { path: AppRoutes.P2P, element: <P2P /> },
    { path: AppRoutes.P2P_MANAGER, element: <OrderManager /> },
    { path: AppRoutes.PRESALE, element: <Presale /> },
    { path: AppRoutes.DOCS, element: <Docs /> },
    { path: AppRoutes.FAQ, element: <Faq /> },
    { path: AppRoutes.GMAP_LOCATION, element: <GMap /> },
    { path: AppRoutes.COMINGSOON, element: <ComingSoon /> },
    { path: AppRoutes.NOTFOUND, element: <NotFound /> },
  ])

  // Detect wallet when initial load
  useEffect(() => {
    if (width > 1024) {
      setShowSidebar(false)
    }
  }, [width])

  // Show or hide the sidebar
  const onShowSidebarHandler = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <>
      <Sidebar
        showSidebar={showSidebar}
        onShowSidebarHandler={onShowSidebarHandler}
      />
      <SocialIcons />
      <Navbar onShowSidebarHandler={onShowSidebarHandler} />
      <UseScrollToTop>{routes}</UseScrollToTop>
      <Footer />
    </>
  )
}

export default AppRouter
