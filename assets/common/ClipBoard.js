import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6 2.373a1.04 1.04 0 0 1 1.047-1.04h13.24a1.04 1.04 0 0 1 1.047 1.04V18.96A1.04 1.04 0 0 1 20.287 20h-.347V2.713H6v-.34Z"
      fill="#707070"
    />
    <Path
      d="M3.333 5h13.334a1 1 0 0 1 1 1v16.667a1 1 0 0 1-1 1H3.332a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
      fill="#707070"
    />
  </Svg>
);

export default SvgComponent;
