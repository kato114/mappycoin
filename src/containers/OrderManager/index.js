import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import OrderManagerComponent from "components/OrderManager"

import { P2POrders } from "constants/FakeData"

const OrderManager = () => {
  const { category } = useParams()

  const [pageCategory, setPageCategory] = useState("")
  const [pageOrders, setPageOrders] = useState([])

  useEffect(() => {
    const unifiedCategory = category.replace("-", " ")
    const orderQuery = category.replace("-", "").toUpperCase()

    setPageCategory(unifiedCategory)
    setPageOrders(P2POrders[orderQuery])
  }, [])

  return (
    <OrderManagerComponent
      pageCategory={pageCategory}
      pageOrders={pageOrders}
    />
  )
}

export default OrderManager
