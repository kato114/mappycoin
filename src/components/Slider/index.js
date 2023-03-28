import AliceCarousel from "react-alice-carousel"
import { AboutOne, AboutTwo, AboutThree } from "resources/Images"
import "react-alice-carousel/lib/scss/alice-carousel.scss"
import "./style.scss"

const handleDragStart = (e) => e.preventDefault()

const responsive = {
  0: { items: 1 },
  767: { items: 2 },
  1024: { items: 3 },
}

const items = [
  <img
    className="carousel-image rounded"
    src={AboutOne}
    alt="one"
    onDragStart={handleDragStart}
  />,

  <img
    className="carousel-image rounded"
    src={AboutTwo}
    alt="two"
    onDragStart={handleDragStart}
  />,
  <img
    className="carousel-image rounded"
    src={AboutThree}
    alt="three"
    onDragStart={handleDragStart}
  />,
  <img
    className="carousel-image rounded"
    src={AboutOne}
    alt="one"
    onDragStart={handleDragStart}
  />,
  <img
    className="carousel-image rounded"
    src={AboutTwo}
    alt="two"
    onDragStart={handleDragStart}
  />,
  <img
    className="carousel-image rounded"
    src={AboutThree}
    alt="three"
    onDragStart={handleDragStart}
  />,
]

const Slider = () => {
  return (
    <AliceCarousel
      items={items}
      responsive={responsive}
      mouseTracking
      infinite
      disableButtonsControls
    />
  )
}

export default Slider
