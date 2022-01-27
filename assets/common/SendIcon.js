import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m13.21 12.437-9.415 1.57a.625.625 0 0 0-.482.398L.066 23.1c-.31.8.527 1.563 1.294 1.179l22.5-11.25a.937.937 0 0 0 0-1.678L1.36.102C.593-.282-.244.482.066 1.281l3.248 8.696a.625.625 0 0 0 .482.399l9.415 1.569a.25.25 0 0 1 0 .492h-.001Z"
      fill="#087690"
    />
  </Svg>
);

export default SvgComponent;
