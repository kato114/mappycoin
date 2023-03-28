import { useState } from "react"
import { IoAdd, IoRemove } from "react-icons/io5"
import "./style.scss"

const FaqItem = ({ title, content }) => {
  const [active, setActive] = useState(false)

  const onActiveChange = () => {
    setActive(!active)
  }

  return (
    <div className="faq-main-item grid rounded-sm blur-bg shadowed">
      <div
        className={`faq-main-item-title flex${
          active === true ? " faq-item-active" : ""
        }`}
        onClick={onActiveChange}
      >
        <span>{title}</span>
        {active === true ? <IoRemove /> : <IoAdd />}
      </div>
      {active === true && (
        <div className="faq-main-item-content">{content}</div>
      )}
    </div>
  )
}

export default FaqItem
