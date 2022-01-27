import React from "react";
import PhoneInput from "react-native-phone-number-input";
import { StyleSheet, Image } from "react-native";
import DownArrow from "../../../assets/common/downArrow.png";
import { colors, correctSize } from "../../../theme";

export default function PhoneInputField({ setNumber, number }) {
  return (
    <PhoneInput
      defaultCode="US"
      defaultValue={number}
      onChangeFormattedText={(text) => {
        setNumber(text);
      }}
      textInputProps={{
        selectionColor: colors.white,
        placeholderTextColor: colors.white,
      }}
      autoFocus
      containerStyle={styles.inputContainer}
      textContainerStyle={styles.textContainer}
      codeTextStyle={styles.countryCode}
      textInputStyle={styles.textInput}
      flagButtonStyle={styles.flagButton}
      renderDropdownImage={<Image source={DownArrow} />}
    />
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    width: "100%",
    marginTop: correctSize(10),
  },
  textContainer: {
    backgroundColor: "transparent",
    color: "#fff",
    borderLeftWidth: 2,
    borderLeftColor: "#fff",
    paddingVertical: 0,
  },
  countryCode: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "700",
  },
  flagButtonStyle: { paddingVertical: 0 },
  textInput: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: correctSize(14),
  },
});
