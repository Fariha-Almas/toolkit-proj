import React, { useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { colors, correctSize } from "../../theme";
import BTC from "../../assets/common/BTC";
import HSRIcon from "../../assets/common/HSR";

import {
  getWallet,
  setCurrentCoin,
  walletSelector,
  clearState,
} from "../../redux/reducers/wallet";
import { useNavigation } from "@react-navigation/native";
import { userSelector } from "../../redux/reducers/user";

const Item = (account) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const setCoin = () => {
    dispatch(setCurrentCoin(account));
    navigation.navigate("Receive");
  };
  return (
    <TouchableOpacity onPress={() => setCoin()}>
      <View style={styles.item}>
        <View style={styles.innerContainer}>
          {account.Coin.symbol == "BNB" ? <BTC /> : <HSRIcon />}
          <View style={{ marginLeft: correctSize(10) }}>
            <Text style={styles.title}>{account.Coin.name}</Text>
            <Text style={styles.name}>{account.Coin.symbol}</Text>
          </View>
        </View>
        {/* <View style={styles.balance}>
          <Text style={styles.price}>
            {(account.balance / account.Coin.multiplier).toFixed(2).toString()}
          </Text>
          {/* <Text style={[styles.price, { color: "#45A54E" }]}>{deviation}</Text> 
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const Coins = () => {
  const dispatch = useDispatch();
  const { wallet, isFetching, isError, success, errorMessage } =
    useSelector(walletSelector);
  const renderItem = ({ item }) => <Item {...item} />;
  const { token } = useSelector(userSelector);
  useEffect(() => {
    dispatch(getWallet({ token }));
  }, [dispatch]);
  useEffect(() => {
    if (isError) {
      alert(errorMessage);
      dispatch(clearState());
    }
    if (success) {
      dispatch(clearState());
    }
  }, [isError, success]);
  return (
    <View style={styles.container}>
      {isFetching ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={wallet}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

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
  },
  amount: {
    color: "#FAA731",
    textAlign: "center",
    marginVertical: correctSize(20),
    fontSize: correctSize(36),
    fontFamily: "Poppins",
  },
  balance: {
    alignContent: "center",
    justifyContent: "center",
  },
});

export default Coins;
