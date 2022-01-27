import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17 1 1 17m16 0L1 1l16 16Z"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)

export default SvgComponent
