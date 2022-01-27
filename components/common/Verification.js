import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { colors, correctSize } from "../../theme";

const styles = StyleSheet.create({
  title: {
    fontSize: correctSize(14),
    color: "#fff",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#fff",
    textAlign: "center",
    color: "#fff",
  },
  focusCell: {
    borderColor: "#000",
  },
  container: {
    marginTop: correctSize(20),
    alignSelf: "flex-start",
    width: "100%",
  },
  input: {
    color: "#fff",
  },
});

const CELL_COUNT = 6;

const Verification = ({ message, onPress, value, setValue, displayHeader=true }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.container}>
      {displayHeader && <Text style={styles.title}>Enter verification code</Text>}
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType={"number-pad"}
        textContentType="oneTimeCode"
        textInputStyle={styles.input}
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <Text style={[styles.title, { marginTop: 10 }]}>
        {message ? message : "Verification code will expire in 5 minutes."}
        <Text
          onPress={() => onPress()}
          style={[styles.title, { color: colors.blackBackground }]}
        >
          {" "}
          Resend Code
        </Text>
      </Text>
    </View>
  );
};

export default Verification;
