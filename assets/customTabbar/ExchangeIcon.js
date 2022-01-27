import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={22}
    height={23}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M4.857 5.833a1 1 0 1 0 0-2v2ZM1 4.833l-.705-.709a1 1 0 0 0 0 1.419L1 4.833ZM5.562 1.71A1 1 0 0 0 4.152.291l1.41 1.418Zm-1.41 7.667a1 1 0 0 0 1.41-1.419l-1.41 1.419Zm.705-5.543H1v2h3.857v-2Zm-3.152 1.71 3.857-3.834L4.152.291.295 4.124l1.41 1.419Zm3.857 2.414L1.705 4.124.295 5.543l3.857 3.833 1.41-1.419Z"
      fill={props.isFocused ? "#fff" : "#969696"}
    />
    <Path
      d="M20.286 8.667v0a4 4 0 0 0-4-4h-13"
      stroke={props.isFocused ? "#fff" : "#969696"}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M16.715 16.5a1 1 0 0 0 0 2v-2Zm3.857 1 .705.71a1 1 0 0 0 0-1.42l-.705.71Zm-4.562 3.124a1 1 0 0 0 1.41 1.419l-1.41-1.419Zm1.41-7.667a1 1 0 0 0-1.41 1.419l1.41-1.419Zm-.705 5.543h3.857v-2h-3.857v2Zm3.152-1.71-3.857 3.834 1.41 1.419 3.857-3.834-1.41-1.418Zm-3.857-2.414 3.857 3.833 1.41-1.418-3.857-3.834-1.41 1.419Z"
      fill={props.isFocused ? "#fff" : "#969696"}
    />
    <Path
      d="M1.286 13.667v0a4 4 0 0 0 4 4h13"
      stroke={props.isFocused ? "#fff" : "#969696"}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default SvgComponent;
