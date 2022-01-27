import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.5 9.167H5.345l4.41-4.411-1.178-1.178L2.155 10l6.422 6.422 1.179-1.178-4.411-4.41H17.5V9.166Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
