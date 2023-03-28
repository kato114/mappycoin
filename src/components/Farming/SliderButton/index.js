import { useState } from "react"
import "./style.scss"

const SliderButton = ({ getSliderState = () => {} }) => {
  const [active, setActive] = useState(false)

  const onClickHandler = () => {
    getSliderState(active)
    setActive(!active)
  }

  return (
    <div
      className={`slider-button flex shadowed rounded-md${
        active === true ? " slider-button-active" : ""
      }`}
      onClick={onClickHandler}
    >
      <div className="rounded-md shadowed"></div>
    </div>
  )
}

export default SliderButton
