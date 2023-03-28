import { useState, useEffect } from "react"
import DashboardComponent from "components/Dashboard"
import { calculateTimeLeft } from "helpers/CountdownTimer"
import themeColor from "styles/variable"

import { ethers } from "ethers"
import { useWeb3React } from "@web3-react/core"
import { getPresaleInfo } from "utils/GetPresale"

const colorStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: themeColor.black,
    color: themeColor.green,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? themeColor.gray : themeColor.black,
    color: isFocused
      ? themeColor.white
      : isSelected
      ? themeColor.green
      : themeColor.gray,
  }),
  input: (styles) => ({
    ...styles,
    color: themeColor.green,
    placeholder: themeColor.black,
  }),
  placeholder: (styles) => ({ ...styles, color: themeColor.green }),
}

const Dashboard = () => {
  const { account, chainId } = useWeb3React()

  const [refreshCount, setRefreshCount] = useState(0)

  const [startTimeLeft, setStartTimeLeft] = useState(0)
  const [endTimeLeft, setEndTimeLeft] = useState(0)

  const [presaleInfo, setPresaleInfo] = useState({})
  const [selectOptions, setSelectOptions] = useState([])

  useEffect(() => {
    const options = [
      { value: "all", label: "All Items" },
      { value: "most recent", label: "The Most Recent" },
      { value: "most expensive", label: "The Most Expensive" },
    ]

    setSelectOptions(options)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setRefreshCount(refreshCount + 1)
    }, 3000)

    const initDatas = async () => {
      let presale_info = await getPresaleInfo()
      setPresaleInfo(presale_info)
    }

    initDatas()

    return () => {
      clearTimeout(timer)
    }
  }, [account, chainId, refreshCount])

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTimeLeft(
        calculateTimeLeft(
          Object.keys(presaleInfo).length > 0
            ? ethers.BigNumber.isBigNumber(presaleInfo.presale_start)
              ? ethers.BigNumber.from(presaleInfo.presale_start).toNumber()
              : presaleInfo.presale_start
            : 0
        )
      )
    }, 1000)

    return () => clearTimeout(timer)
  }, [startTimeLeft, refreshCount])

  useEffect(() => {
    const timer = setTimeout(() => {
      setEndTimeLeft(
        calculateTimeLeft(
          Object.keys(presaleInfo).length > 0
            ? ethers.BigNumber.isBigNumber(presaleInfo.presale_end)
              ? ethers.BigNumber.from(presaleInfo.presale_end).toNumber()
              : presaleInfo.presale_end
            : 0
        )
      )
    }, 1000)

    return () => clearTimeout(timer)
  }, [endTimeLeft, refreshCount])

  return (
    <DashboardComponent
      startTimeLeft={startTimeLeft}
      endTimeLeft={endTimeLeft}
      selectOptions={selectOptions}
      colorStyles={colorStyles}
    />
  )
}

export default Dashboard
