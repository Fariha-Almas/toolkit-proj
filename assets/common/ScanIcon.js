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
      d="M12 0h6v5h-2V2h-4V0ZM6 0v2H2v3H0V0h6Zm6 18v-2h4v-3h2v5h-6Zm-6 0H0v-5h2v3h4v2ZM0 8h18v2H0V8Z"
      fill="#087690"
    />
  </Svg>
);

export default SvgComponent;
