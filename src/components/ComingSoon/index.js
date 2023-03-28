import { Link } from "react-router-dom"
import FadeIn from "react-fade-in/lib/FadeIn"

import { AppRoutes } from "constants/UI"
import { GreenCircle } from "resources/SVGs"
import "./style.scss"

const ComingSoon = () => (
  <div className="comingsoon flex">
    <GreenCircle className="comingsoon-decoration-navbar" />
    <FadeIn className="comingsoon-wrapper container flex flex-column">
      <h1>
        <span>Coming Soon</span>
        <GreenCircle className="comingsoon-decoration-wrapper" />
        <GreenCircle className="comingsoon-decoration-small" />
      </h1>
      <p>We are working on building the feature right now.</p>
      <Link to={AppRoutes.DASHBOARD}>Go back to Dashboard</Link>
    </FadeIn>
  </div>
)

export default ComingSoon
