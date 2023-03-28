import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"

import FarmingComponent from "components/Farming"
import themeColor from "styles/variable"
import { stakingPools } from "constants/index"

const colorStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: themeColor.black,
    color: themeColor.green,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isFocused ? themeColor.gray : themeColor.black,
    color: isFocused ? themeColor.black : themeColor.gray,
  }),
  input: (styles) => ({
    ...styles,
    color: themeColor.green,
    placeholder: themeColor.black,
  }),
  placeholder: (styles) => ({ ...styles, color: themeColor.green }),
}

const Farming = () => {
  const { account } = useWeb3React()

  const [selectOptions, setSelectOptions] = useState([])

  useEffect(() => {
    const options = [
      { value: "recent", label: "Recent" },
      { value: "recent", label: "Recent" },
    ]

    setSelectOptions(options)
  }, [])

  return (
    <FarmingComponent
      account={account}
      selectOptions={selectOptions}
      colorStyles={colorStyles}
      stakingPools={stakingPools}
    />
  )
}

export default Farming
