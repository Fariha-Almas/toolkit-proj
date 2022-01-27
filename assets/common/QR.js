import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={140}
    height={140}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path fill="#fff" d="M0 0h140v140H0z" />
    <Path d="M45 5H5v40h40V5Zm-5 35H10V10h30v30Z" fill="#000" />
    <Path
      d="M35 15H15v20h20V15ZM5 135h40V95H5v40Zm5-35h30v30H10v-30Z"
      fill="#000"
    />
    <Path
      d="M35 105H15v20h20v-20ZM135 5H95v40h40V5Zm-5 35h-30V10h30v30Z"
      fill="#000"
    />
    <Path
      d="M125 15h-20v20h20V15ZM65 85h-5V70h5v-5H55v20H40V65h-5v20h-5V50h-5v5H5v5h20v10H15v5h10v15h40v-5ZM55 95h-5v20h5V95ZM5 75v15h10v-5h-5V75H5ZM80 130H55v-5h10v-5H50v15h30v-5Z"
      fill="#000"
    />
    <Path
      d="M50 45h5v-5h20v15H40v5h5v15h5V60h25v5h-5v5h15v10H75v5h35v-5H90V70h10v-5H80V40h10v-5H55V10h35V5H50v40Z"
      fill="#000"
    />
    <Path
      d="M70 20v-5H60v15h30V15h-5v10H65v-5h5ZM135 100h-5v10h-10v-10h-5v25h5v-10h10v15h-20v5h25v-35ZM105 130H85v5h20v-5ZM105 95h-5v5H90v5h10v5h5V95Z"
      fill="#000"
    />
    <Path
      d="M105 115H85V95h5v-5H70v5h10v5H70v5h10v10H70v5h20v5h5v-5h10v-5ZM135 50h-15v5h10v15h-10v5h10v20h5V50ZM65 100h-5v15h5v-15ZM105 50H85v5h20v-5Z"
      fill="#000"
    />
    <Path d="M125 60h-20v15h5V65h15v-5ZM120 80h-5v15h5V80Z" fill="#000" />
  </Svg>
);

export default SvgComponent;
