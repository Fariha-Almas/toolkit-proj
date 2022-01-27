import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { colors } from "../../theme";
export default function Background({ children }) {
  return (
    <LinearGradient
      colors={colors.gradient}
      style={{ flex: 1, width: "100%" }}
      start={{ x: 0, y: 1 }}
      end={{ x: 0.7, y: 0.2 }}
      locations={[0, 0.7, 1]}
    >
      {children}
    </LinearGradient>
  );
}
