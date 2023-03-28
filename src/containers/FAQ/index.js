import { useState } from "react"
import FaqComponent from "components/FAQ"

import { FaqCategories } from "constants/UI/FAQ"

const { Common } = FaqCategories

const Faq = () => {
  const [page, setPage] = useState(Common)

  const onCategoryChange = (e) => {
    const name = e.target.name

    if (name !== "") {
      setPage(name)
    }
  }

  return <FaqComponent page={page} onCategoryChange={onCategoryChange} />
}

export default Faq
