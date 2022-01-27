import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.333 1 1 14.333M1 1l13.333 13.333"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default SvgComponent;
