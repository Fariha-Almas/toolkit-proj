import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.134 1.116A1.246 1.246 0 0 0 13.25.75H2A1.25 1.25 0 0 0 .75 2v11.25c0 .332.131.65.366.884l10 10a1.248 1.248 0 0 0 1.768 0l11.25-11.25a1.25 1.25 0 0 0 0-1.768l-10-10ZM12 21.483l-8.75-8.75V3.25h9.482l8.75 8.75L12 21.483Z"
      fill="#087690"
    />
  </Svg>
)

export default SvgComponent
