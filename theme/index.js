import { Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;
import colors from "./colors";

function correctSize(size) {
  return (size / 360) * windowWidth;
}

export { colors, correctSize };
