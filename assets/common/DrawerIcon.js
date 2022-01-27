import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={20}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1 14.667a1 1 0 0 1 0-2h14.667a1 1 0 1 1 0 2H1Zm0-6.333a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2H1Zm0-6.333a1 1 0 1 1 0-2h11.334a1 1 0 1 1 0 2H1Z"
      fill="#666"
    />
  </Svg>
);

export default SvgComponent;
