import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, correctSize } from "../../theme";
import BTC from "../../assets/common/BTC";
import HSRIcon from "../../assets/common/HSR";

import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import {
  getWallet,
  setCurrentCoin,
  walletSelector,
} from "../../redux/reducers/wallet";
import { userSelector } from "../../redux/reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/core";
import {
  swapSelector,
  swapOut,
  clearState,
  swapPost,
  setOutput,
  setInput,
} from "../../redux/reducers/swap";
import Button from "../../components/common/Button";
import numeral from "numeral";
import { useNavigation } from "@react-navigation/core";
export default function Exchange() {
  const { wallet, isFetching: loading } = useSelector(walletSelector);
  const { token } = useSelector(userSelector);
  const {
    output,
    isTransfered,
    isFetching,
    isError,
    errorMessage,
    input,
    swapError,
  } = useSelector(swapSelector);
  const [percent, setPercent] = useState(0);
  const dispatch = useDispatch();
  const [address, setAddress] = useState();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const BNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
  const HSR = "0x17875653a78D00A6bb14329F19C0D1673e0Cc77C";
  useEffect(() => {
    if (!isFocused) {
      dispatch(getWallet({ token }));
      dispatch(clearState());
      setPercent(0);
    }
  }, [isFocused]);
  useEffect(() => {
    if (isTransfered) {
      alert("Swapped successfully");
      setPercent(0);
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
  const multiplier = (value) => {
    const mul = wallet?.filter(
      (account) => account.Coin.contract_address === BNB
    );
    if (mul) {
      return (mul[0].balance.amount * value).toFixed(4).toString();
    }
    return 0;
  };
  const getAddress = () => {
    const temp = wallet?.filter(
      (account) => account.Coin.contract_address === HSR
    );
    return temp[0].public_key;
  };
  useEffect(() => {
    if (!loading) {
      setAddress(getAddress());
    }
  }, [loading]);
  const handlePercent = (val) => {
    if (val == percent) {
      setPercent(0);
      dispatch(setInput("0"));
      dispatch(setOutput("0"));
    } else {
      setPercent(val);
      switch (val) {
        case 1:
          dispatch(setInput(multiplier(0.25)));
          dispatch(swapOut({ token, from: BNB, to: HSR }));
          return;
        case 2:
          dispatch(setInput(multiplier(0.5)));
          dispatch(swapOut({ token, from: BNB, to: HSR }));
          return;
        case 3:
          dispatch(setInput(multiplier(1)));
          dispatch(swapOut({ token, from: BNB, to: HSR }));
      }
    }
  };
  // useEffect(() => {
  //   if (!input) {
  //     dispatch(setInput(0));
  //   }
  // }, [input]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          I have {numeral(input).format("0.0000")} BNB
        </Text>
        <View style={styles.box}>
          <View style={styles.innerbox}>
            <BTC style={{ marginRight: correctSize(10) }} />
            <Text style={styles.itemText}>BNB</Text>
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
                setPercent(0);
                dispatch(swapOut({ token, from: BNB, to: HSR }));
              }}
              returnKeyType="done"
              value={input}
              selectionColor="#fff"
            />
          </View>
        </View>
      </View>
      <View style={styles.line} />
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
                setPercent(0);
                dispatch(
                  swapOut({
                    token,
                    from: HSR,
                    to: BNB,
                    first: false,
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
      <View style={styles.minMax}>
        <TouchableOpacity
          style={percent == 1 ? styles.selected : {}}
          onPress={() => handlePercent(1)}
        >
          <Text style={[styles.itemText, styles.padding]}>25%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={percent == 2 ? styles.selected : {}}
          onPress={() => handlePercent(2)}
        >
          <Text style={[styles.itemText, styles.padding]}>50%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={percent == 3 ? styles.selected : {}}
          onPress={() => handlePercent(3)}
        >
          <Text style={[styles.itemText, styles.padding]}>100%</Text>
        </TouchableOpacity>
      </View>
      {Number(output) > 0 && Number(input) > 0 && (
        <Button
          disabled={isFetching}
          onPress={() =>
            dispatch(swapPost({ token, from: BNB, to: HSR, address }))
          }
          text={isFetching ? "Loading..." : "Swap"}
        />
      )}
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
