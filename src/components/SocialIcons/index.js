import { keysIn } from "lodash"
import { SocialLinks } from "constants/UI"

import "./style.scss"

const SocialIcons = () => (
  <div className="socialicons blur-bg">
    <div className="socialicons-wrapper flex flex-column">
      {keysIn(SocialLinks).map((data, index) => (
        <a
          key={index}
          className="flex"
          href={SocialLinks[data].link}
          target="_blank"
          rel="noreferrer"
          aria-label={data.toLowerCase()}
        >
          {SocialLinks[data].icon}
        </a>
      ))}
    </div>
  </div>
)

export default SocialIcons
