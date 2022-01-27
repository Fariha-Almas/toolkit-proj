import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={32}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M6.833 20.548v3.786m5.834-17.95C11.333 5.154 8.988 4.3 6.833 4.246l5.834 2.136ZM1 18.05c1.253 1.542 3.583 2.422 5.833 2.497L1 18.05ZM6.833 4.245c-2.565-.063-4.861 1.007-4.861 3.933 0 5.384 10.695 2.692 10.695 8.077 0 3.07-2.847 4.39-5.834 4.292V4.245Zm0 0V1v3.245ZM17.666 12.667l6.4 6.667M31 12.667H17.666 31Zm-13.334 0L24.066 6l-6.4 6.667Z"
      stroke="#087690"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
