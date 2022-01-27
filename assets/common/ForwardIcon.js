import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={8}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.17 15a1 1 0 0 0 .78-.37l4.83-6a1 1 0 0 0 0-1.27l-5-6A1.001 1.001 0 1 0 .24 2.64L4.71 8 .39 13.36A1 1 0 0 0 1.17 15Z"
      fill="#E6E6E6"
    />
  </Svg>
);

export default SvgComponent;
