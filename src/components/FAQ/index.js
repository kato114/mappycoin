import FadeIn from "react-fade-in/lib/FadeIn"

import { GreenCircle } from "resources/SVGs"

import FaqItem from "./Item"
import { FaqTabs } from "constants/UI"
import { FaqCategories } from "constants/UI/FAQ"

import "./style.scss"

const { Common, Account } = FaqCategories

const Faq = ({ page, onCategoryChange }) => (
  <div className="faq flex flex-column">
    <GreenCircle className="faq-decoration-navbar" />
    <FadeIn className="faq-wrapper container">
      <div className="faq-main grid">
        <div className="faq-main-title flex">
          <h1>FAQ</h1>
          <div className="faq-main-title-category flex">
            <button
              className={page === Common ? "faq-active" : ""}
              name={Common}
              onClick={(e) => onCategoryChange(e)}
            >
              Common
            </button>
            <button
              className={page === Account ? "faq-active" : ""}
              name={Account}
              onClick={(e) => onCategoryChange(e)}
            >
              Account
            </button>
          </div>
        </div>
        {FaqTabs[page].map((data, index) => (
          <FaqItem key={index} title={data.title} content={data.content} />
        ))}
      </div>
    </FadeIn>
  </div>
)

export default Faq
