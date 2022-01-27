import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors, correctSize } from "../../../theme";

export default function Button({
  onPress,
  disabled = false,
  loading = false,
  text = "Send",
}) {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={styles.button}
      onPress={() => onPress()}
    >
      {loading ? (
        <ActivityIndicator style={styles.buttonTextMain} />
      ) : (
        <Text style={styles.buttonTextMain}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    borderRadius: 30,
    marginTop: correctSize(20),
  },
  buttonTextMain: {
    textAlign: "center",
    paddingVertical: correctSize(14),
    fontFamily: "Montserrat",
    fontSize: correctSize(18),
    fontWeight: "600",
    color: "#fff",
  },
});
