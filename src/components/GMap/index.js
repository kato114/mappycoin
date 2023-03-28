import FadeIn from "react-fade-in/lib/FadeIn"

import { GreenCircle } from "resources/SVGs"
import "./style.scss"

const GMap = () => {
  return (
    <div className="gmap flex flex-column">
      <GreenCircle className="gmap-decoration-navbar" />
      <FadeIn className="gmap-wrapper container flex flex-column">
        <div className="gmap-mapbox">
          <h1>Buy and sell from anywhere</h1>
          <div className="gmap-mapbox-wrapper flex flex-column rounded-md blur-bg shadowed"></div>
        </div>
      </FadeIn>
    </div>
  )
}

export default GMap
