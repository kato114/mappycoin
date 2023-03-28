import { useState } from "react"

import {
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoLinkOutline,
} from "react-icons/io5"

import "./style.scss"

const FarmDetail = ({ pair }) => {
  const [collapsed, setCollapsed] = useState(false)

  const onFlipCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="farming-pool-wrap-detail flex flex-column">
      <button className="flex" onClick={onFlipCollapse}>
        <span>Detail</span>
        {collapsed ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
      </button>
      <div
        className={`farming-pool-wrap-detail-main flex flex-column blur-bg rounded-sm shadowed${
          collapsed ? " farming-pool-wrap-detail-main-collapsed" : ""
        }`}
      >
        <a className="flex" href="">
          Get {pair[0].name}-{pair[1].name} LP <IoLinkOutline />
        </a>
        <a className="flex" href="">
          View Contract <IoLinkOutline />
        </a>
        <a className="flex" href="">
          See Pair Info <IoLinkOutline />
        </a>
      </div>
    </div>
  )
}

export default FarmDetail
