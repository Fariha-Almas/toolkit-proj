import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors, correctSize } from "../../theme";
export default function LoginSignUpButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{disabled ? "Loading..." : title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { alignSelf: "center", marginTop: correctSize(40) },
  buttonText: {
    color: colors.orange,
    backgroundColor: "#fff",
    paddingVertical: correctSize(16),
    paddingHorizontal: correctSize(60),
    fontSize: correctSize(18),
    fontWeight: "600",
    borderRadius: 30,
    overflow: "hidden",
  },
});
