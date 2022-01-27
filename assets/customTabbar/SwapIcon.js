import * as React from "react";
import Svg, { G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SvgComponent = () => (
  <Svg width={74} height={62} fill="none" xmlns="http://www.w3.org/2000/svg">
    <G filter="url(#a)">
      <Path d="M36.999.233a24 24 0 1 1 0 48 24 24 0 0 1 0-48Z" fill="#087690" />
    </G>
    <Path
      d="M41.709 34.996h.756a1.05 1.05 0 0 0 1.135-.937V20.003h2.265c1.01 0 1.514-1.012.802-1.6l-3.78-3.123a1.308 1.308 0 0 0-1.599 0l-3.779 3.123c-.709.586-.212 1.6.802 1.6h2.264v14.056a1.05 1.05 0 0 0 1.134.937Zm-7.18-19.055v14.057h2.267c1.007 0 1.515 1.01.802 1.6l-3.778 3.124a1.308 1.308 0 0 1-1.6 0l-3.779-3.123c-.71-.587-.21-1.6.801-1.6h2.264V15.941a1.05 1.05 0 0 1 1.134-.937h.753a1.05 1.05 0 0 1 1.136.937Z"
      fill="#fff"
    />
    <Defs></Defs>
  </Svg>
);

export default SvgComponent;
