import React, { useEffect } from "react";
import {
  View,
  SectionList,
  Text,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { colors, correctSize } from "../../theme";
import IncomingIcon from "../../assets/common/IncomingIcon";
import OutgoingIcon from "../../assets/common/OutgoingIcon";
import {
  getTransactionHistory,
  clearState,
  walletSelector,
} from "../../redux/reducers/wallet";
import numeral from "numeral";
import { userSelector } from "../../redux/reducers/user";
import _ from "lodash";
import moment from "moment";

export default function TransactionHistory() {
  const { transactions, isFetching } = useSelector(walletSelector);
  const { token } = useSelector(userSelector);
  const [DATA, setData] = React.useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactionHistory({ token, limit: transactions.length }));
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    const data = _.chain(transactions)
      .groupBy((record) => moment(record.createdAt).format("DD MMMM, YYYY"))
      .map((value, key) => ({
        title: key,
        data: value,
      }))
      .value();
    setData(data);
  }, [transactions]);
  const Item = ({ data }) => (
    <TouchableOpacity style={styles.item}>
      {data.flow == "receive" ? <IncomingIcon /> : <OutgoingIcon />}
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionText}>{`${numeral(data.value).format(
          "0.00"
        )} ${data?.Account?.Coin?.symbol}`}</Text>
        <Text
          style={[
            styles.header,
            { marginBottom: 0, fontSize: correctSize(12) },
          ]}
        >
          {`${
            data.flow == "receive" ? "Amount Received" : "Amount Transfered"
          }`}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item data={item} />}
        refreshing={isFetching}
        ListEmptyComponent={
          <Text style={styles.empty}>Transaction History is empty</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            tintColor="#fff"
            onRefresh={() =>
              dispatch(
                getTransactionHistory({ token, limit: transactions.length })
              )
            }
          />
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={[styles.header, { backgroundColor: colors.blackBackground }]}
          >
            {title}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackBackground,
    flex: 1,
    padding: correctSize(32),
  },
  empty: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: correctSize(16),
    paddingVertical: correctSize(16),
    paddingHorizontal: correctSize(12),
    backgroundColor: "#FFFFFF1C",
    borderRadius: 20,
    overflow: "hidden",
  },
  item: {
    backgroundColor: "#FFFFFF1C",
    paddingVertical: correctSize(16),
    paddingHorizontal: correctSize(12),
    marginBottom: correctSize(16),
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  transactionText: {
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: correctSize(16),
  },
  header: {
    color: colors["light-gray"],
    marginBottom: correctSize(18),
    fontSize: correctSize(13),
    fontFamily: "Poppins",
  },
});
