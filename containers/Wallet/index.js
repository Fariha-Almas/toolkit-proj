import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  RefreshControl,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";
import { colors, correctSize } from "../../theme";
import BTC from "../../assets/common/BTC";
import HSRIcon from "../../assets/common/HSR";

import {
  getWallet,
  walletSelector,
  clearState,
} from "../../redux/reducers/wallet";
import { userSelector } from "../../redux/reducers/user";
import { useIsFocused } from "@react-navigation/native";
import numeral from "numeral";
const Item = ({ balance, Coin }) => {
  return (
    <View style={styles.item}>
      <View style={styles.innerContainer}>
        {Coin.symbol == "BNB" ? <BTC /> : <HSRIcon />}
        <View style={{ marginLeft: correctSize(10) }}>
          <Text style={styles.title}>{Coin.name}</Text>
          <Text style={styles.name}>{Coin.symbol}</Text>
        </View>
      </View>
      <View style={styles.balance}>
        <Text style={styles.price}>
          {numeral(balance.amount).format("0.0000a")}
        </Text>
        <Text style={[styles.price, { color: colors["light-gray"] }]}>
          USD {numeral(balance.dollar_value).format("0.00a")}
        </Text>
        {/* <Text style={[styles.price, { color: "#45A54E" }]}>{deviation}</Text> */}
      </View>
    </View>
  );
};
const Header = ({ value }) => (
  <Text style={[styles.title, styles.amount]}>
    $ {`${numeral(value).format("0.00a")}`}
  </Text>
);
export function Wallet() {
  const dispatch = useDispatch();
  const { wallet, isFetching, isError, errorMessage, success, total } =
    useSelector(walletSelector);
  const navigation = useNavigation();
  const {
    token,
    fingerPrint,
    mPinEnabled,
    faceId,
    user: { two_factor_authentication },
  } = useSelector(userSelector);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getWallet({ token }));
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (
        !fingerPrint &&
        !mPinEnabled &&
        !faceId &&
        !two_factor_authentication &&
        Constants.isDevice
      ) {
        Alert.alert(
          "Authentication",
          "Please turn on one of the authentications from the settings screen before proceeding.",
          [{ text: "OK", onPress: () => navigation.navigate("Settings") }],
          {
            cancelable: false,
          }
        );
      }
    }
  }, [fingerPrint, mPinEnabled, faceId, two_factor_authentication, isFocused]);

  useEffect(() => {
    if (isError) {
      alert(errorMessage);
      dispatch(clearState());
    }
    if (success) {
      dispatch(clearState());
    }
  }, [isError, success]);
  const renderItem = ({ item }) => <Item {...item} />;
  return (
    <View style={styles.container}>
      <Header value={total} />
      <FlatList
        contentContainerStyle={styles.contentContainer}
        refreshing={isFetching}
        refreshControl={
          <RefreshControl
            colors={[colors.orange, colors.orange]}
            refreshing={isFetching}
            tintColor="#fff"
            onRefresh={() => dispatch(getWallet({ token }))}
          />
        }
        data={wallet}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackBackground,
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "#FFFFFF0A",
    flex: 1,
    height: Dimensions.get("screen").height / 1.5,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 25,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: "#707070",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: correctSize(20),
    color: "#fff",
    fontWeight: "400",
    fontFamily: "Poppins",
  },
  name: {
    fontSize: correctSize(15),
    color: "#969696",
    fontWeight: "400",
    fontFamily: "Poppins",
    lineHeight: 22.5,
  },
  price: {
    fontSize: correctSize(15),
    color: "#fff",
    fontWeight: "400",
    fontFamily: "Poppins",
    lineHeight: 22.5,
    textAlign: "right",
  },
  amount: {
    color: colors.orange,
    textAlign: "center",
    marginVertical: correctSize(20),
    fontSize: correctSize(36),
    fontFamily: "Poppins",
  },
  balance: {
    alignContent: "flex-end",
    justifyContent: "center",
  },
});
