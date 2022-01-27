import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, correctSize } from "../../theme";
import USD from "../../assets/common/USD";
import HSRIcon from "../../assets/common/HSR";

import { TextInput } from "react-native-gesture-handler";
import {
  getWallet,
  walletSelector,
} from "../../redux/reducers/wallet";
import { userSelector } from "../../redux/reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/core";
import {
  swapSelector,
  clearState,
  setOutput,
  setInput,
  getDollarsWithHSR,
} from "../../redux/reducers/swap";
import Button from "../../components/common/Button";
import numeral from "numeral";
import { CardElement } from "@stripe/stripe-react-native";
export default function Purchase() {
  const { token } = useSelector(userSelector);
  const {
    output,
    isTransfered,
    isFetching,
    isError,
    errorMessage,
    input,
    swapError,
    dollarValue,
    hsrValue,
  } = useSelector(swapSelector);
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) {
      dispatch(clearState());
    }
    return () => {
      dispatch(clearState());
    }
  }, [isFocused]);
  useEffect(() => {
    if (isTransfered) {
      alert("Swapped successfully");
      dispatch(clearState());
    }
  }, [isTransfered]);
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
    }
  }, [isError]);
  useEffect(() => {
    if (swapError) {
      alert(errorMessage);
      dispatch(clearState());
    }
  }, [swapError]);
  useEffect(() => {
    dispatch(setOutput(hsrValue.toString()));
    dispatch(setInput(dollarValue.toString()));
  }, [dollarValue, hsrValue]);
  return (<View style={styles.container}>
      <View>
        <Text style={styles.title}>
          I want {numeral(output).format("0.0000")} HSR
        </Text>
        <View style={styles.box}>
          <View style={styles.innerbox}>
            <HSRIcon style={{ marginRight: correctSize(10) }} />
            <Text style={styles.itemText}>HSR</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="0.0000"
              placeholderTextColor="#fff"
              editable={!isFetching}
              onChangeText={(val) => dispatch(setOutput(val))}
              onSubmitEditing={() => {
                dispatch(
                  getDollarsWithHSR({
                    token,
                    amount: output,
                    type: "token",
                  })
                );
              }}
              selectionColor="#fff"
              keyboardType="numeric"
              returnKeyType="done"
              value={output}
              style={styles.itemText}
            />
          </View>
        </View>
      </View>
      <View style={styles.line} />
      <View>
        <Text style={styles.title}>
          I have {numeral(input).format("0.0000")} USD
        </Text>
        <View style={styles.box}>
          <View style={styles.innerbox}>
            <USD style={{ marginRight: correctSize(10) }} />
            <Text style={styles.itemText}>USD</Text>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="0.0000"
              placeholderTextColor="#fff"
              editable={!isFetching}
              autoFocus
              keyboardType="numeric"
              style={styles.itemText}
              onChangeText={(val) => dispatch(setInput(val))}
              onSubmitEditing={() => {
                dispatch(
                  getDollarsWithHSR({
                    token,
                    amount: input * 100,
                    type: "dollar",
                  })
                );
              }}
              returnKeyType="done"
              value={input}
              selectionColor="#fff"
            />
          </View>
        </View>
      </View>

      <Button
        disabled={isFetching || (Number(output) === 0 && Number(input) === 0)}
        onPress={() => {
          alert("Swap");
          setSubmitted(true);
        }}
        text={isFetching ? "Loading..." : "Purchase"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackBackground,
    flex: 1,
    padding: correctSize(40),
  },
  title: {
    fontSize: correctSize(15),
    color: "#969696",
  },
  innerbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  box: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: correctSize(20),
  },
  itemText: {
    color: "#fff",
    fontSize: correctSize(20),
  },
  line: {
    height: 1,
    backgroundColor: "#707070",
    width: "70%",
    marginBottom: correctSize(30),
  },
  inputWrapper: {
    backgroundColor: "#FFFFFF1C",
    padding: 4,
  },
  minMax: {
    backgroundColor: "#FFFFFF1C",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    marginTop: correctSize(30),
    overflow: "hidden",
  },
  padding: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  selected: {
    backgroundColor: "#eaeaea1C",
    overflow: "hidden",
  },
});
