import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, correctSize } from "../../theme";
import RNPickerSelect from "react-native-picker-select";
import ForwardIcon from "../../assets/common/ForwardIcon";
import ScanIcon from "../../assets/common/ScanIcon";
import { useSelector, useDispatch } from "react-redux";
import {
  getCoins,
  setCurrentCoin,
  sendTransaction,
  clearState,
} from "../../redux/reducers/wallet";
import { userSelector } from "../../redux/reducers/user";
import { walletSelector } from "../../redux/reducers/wallet";
import { Camera } from "expo-camera";
import numeral from "numeral";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Button from "../../components/common/Button";
import { useNavigation } from "@react-navigation/native";
export default function Send() {
  const placeholder = {
    label: "Select a coin",
    value: null,
    color: "#000",
  };
  const {
    coins,
    currentCoin,
    success,
    isError,
    errorMessage,
    isTransfered,
    isFetching,
  } = useSelector(walletSelector);
  const { token } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [coinSelected, setCoinSelected] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    dispatch(getCoins({ token }));
  }, []);

  useEffect(() => {
    if (amount > 0 && publicKey !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [amount, publicKey]);

  useEffect(() => {
    if (isError) {
      alert(errorMessage);
      dispatch(clearState());
    }
    if (success) {
      dispatch(clearState());
    }
  }, [isError, success]);
  useEffect(() => {
    if (isTransfered) {
      alert("Transfer successful!");
      dispatch(clearState());
      navigation.goBack();
    }
  }, [isTransfered]);
  const handleSelect = (value) => {
    if (value) {
      const filtered = coins.find((coin) => coin.value === value);
      setCoinSelected(value);
      dispatch(setCurrentCoin(filtered));
    } else {
      setCoinSelected("");
    }
  };
  const scan = ({ data }) => {
    setScanned(false);
    setPublicKey(data);
  };
  const transfer = async () => {
    await dispatch(
      sendTransaction({
        token,
        receiver_acc_id: publicKey,
        sender_acc_id: currentCoin?.Accounts[0].public_key,
        value: amount,
        coin_id: currentCoin?.value,
      })
    );
  };
  return (
    <View style={styles.container}>
      {scanned && (
        <Camera
          onBarCodeScanned={!scanned ? undefined : scan}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {!scanned && (
        <>
          <View style={{ marginTop: correctSize(20) }}>
            <Text style={styles.label}>Coin</Text>

            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              style={pickerSelectStyles}
              onValueChange={(value) => handleSelect(value)}
              placeholder={placeholder}
              items={coins}
              value={coinSelected}
              Icon={() => {
                return <ForwardIcon size={1.5} />;
              }}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          <View style={{ marginTop: correctSize(20) }}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.innerItem}>
              <TextInput
                style={styles.textInput}
                selectionColor="#fff"
                placeholder="Enter/paste Address information"
                placeholderTextColor={colors["light-gray"]}
                value={publicKey}
                returnKeyType="done"
                onChangeText={(text) => setPublicKey(text)}
              />
              <TouchableOpacity
                hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                onPress={() => hasPermission && setScanned(true)}
              >
                <ScanIcon />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: correctSize(20) }}>
            {coinSelected !== "" && (
              <>
                <Text style={styles.label}>Amount</Text>
                <View style={styles.innerItem}>
                  <TextInput
                    style={styles.textInput}
                    selectionColor="#fff"
                    placeholder="Min 0.00001"
                    placeholderTextColor={colors["light-gray"]}
                    value={amount?.toString()}
                    onChangeText={(text) => setAmount(text)}
                    returnKeyType="done"
                    keyboardType="numeric"
                    editable={true}
                  />
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                    onPress={() =>
                      setAmount(parseFloat(currentCoin?.Accounts[0].balance))
                    }
                  >
                    <View style={styles.coinbox}>
                      <Text style={styles.selectedCoin}>
                        {currentCoin?.symbol}
                      </Text>
                    </View>
                    <Text style={styles.buttonText}>All</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{ marginTop: correctSize(8), flexDirection: "row" }}
                >
                  <Text style={styles.label}>Available</Text>
                  <Text
                    style={[styles.label, { color: "#fff", paddingLeft: 8 }]}
                  >
                    {numeral(currentCoin?.Accounts[0].balance).format("0.00a")}{" "}
                    {currentCoin?.symbol}
                  </Text>
                </View>
              </>
            )}
          </View>
          <Button
            loading={isFetching}
            disabled={disabled}
            onPress={() => transfer()}
          />
        </>
      )}
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    fontFamily: "Poppins",
    paddingVertical: correctSize(16),
    paddingHorizontal: correctSize(24),
    borderRadius: 20,
    backgroundColor: "#FFFFFF1C",
    color: "#fff",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    fontFamily: "Poppins",
    paddingVertical: correctSize(16),
    paddingHorizontal: correctSize(24),
    borderRadius: 20,
    backgroundColor: "#FFFFFF1C",
    color: "#fff",
    paddingRight: 30, //ensure the text is never behind the icon
  },
  iconContainer: {
    padding: correctSize(20),
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackBackground,
    flex: 1,
    padding: correctSize(32),
  },

  buttonText: {
    color: colors.orange,
    fontFamily: "Poppins",
    fontSize: correctSize(14),
  },
  selectedCoin: {
    fontSize: correctSize(14),
    color: "#fff",
    fontFamily: "Poppins",
  },
  coinbox: {
    marginRight: correctSize(3),
    paddingRight: correctSize(3),
    borderRightWidth: 2,
    borderRightColor: colors["light-gray"],
  },
  innerItem: {
    backgroundColor: "#FFFFFF1C",
    paddingVertical: correctSize(16),
    paddingHorizontal: correctSize(24),
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    fontSize: 13,
    fontFamily: "Poppins",
    color: "#fff",
    width: "50%",
  },
  label: {
    color: colors["light-gray"],
    marginBottom: correctSize(18),
    fontSize: correctSize(13),
    fontFamily: "Poppins",
  },
});
