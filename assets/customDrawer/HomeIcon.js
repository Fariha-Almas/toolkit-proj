import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={30}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M15.574 1.076a.947.947 0 0 0-1.165 0L.937 11.58l1.166 1.474L3.75 11.77v11.605a1.879 1.879 0 0 0 1.875 1.875h18.75a1.879 1.879 0 0 0 1.875-1.875V11.778l1.647 1.284 1.166-1.473-13.49-10.513Zm1.301 22.299h-3.75v-7.5h3.75v7.5Zm1.875 0v-7.5A1.877 1.877 0 0 0 16.875 14h-3.75a1.877 1.877 0 0 0-1.875 1.875v7.5H5.625V10.308L15 3.005l9.375 7.313v13.057H18.75Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgComponent;
