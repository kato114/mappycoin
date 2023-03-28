import { Logo } from "resources/SVGs"
import "./style.scss"

const Loading = () => (
  <div className="loading flex">
    <div className="loading-wrapper container flex flex-column">
      <Logo />
      <span>LOADING</span>
      <div className="flex flex-column"></div>
    </div>
  </div>
)

export default Loading
