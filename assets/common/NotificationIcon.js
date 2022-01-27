import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.335 17.334a2.17 2.17 0 0 1-2.167-2.166H1.751a1.085 1.085 0 0 1-.969-1.569l2.052-4.1V6.5a6.5 6.5 0 1 1 13 0v2.994l2.052 4.1a1.084 1.084 0 0 1-.969 1.569h-5.415a2.17 2.17 0 0 1-2.167 2.171Zm-4.494-7.061-1.6 2.889h12.2l-1.6-2.889V6.74h-.012c.008-.107.012-.211.012-.318a4.49 4.49 0 1 0-8.979 0c0 .106 0 .213.011.318h-.027v3.533h-.005Z"
      fill="#666"
    />
  </Svg>
);

export default SvgComponent;
