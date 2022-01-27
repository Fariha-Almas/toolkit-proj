import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { colors, correctSize } from "../../theme";
import Cross from "../../assets/common/Cross";
import SendIcon from "../../assets/common/SendIcon";
import ReceiveIcon from "../../assets/common/ReceiveIcon";
import TransactionHistory from "../../assets/common/TransactionHistory";
import PurchaseIcon from "../../assets/common/Purchase";

export default function SendReceive({ navigation, onSelect }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View />
        <Text style={styles.headerTitle}>Send/Recieve</Text>
        <View />
      </View>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Send");
            onSelect();
          }}
        >
          <SendIcon style={styles.icon} />
          <View style={{ flexDirection: "column", flex: 0.9 }}>
            <Text style={styles.buttonTitle}>Send Payment</Text>
            <Text style={styles.description}>
              Send Amount by sharing QR code or wallet Address
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Coins");
            onSelect();
          }}
        >
          <ReceiveIcon style={styles.icon} />
          <View style={{ flexDirection: "column", flex: 0.9 }}>
            <Text style={styles.buttonTitle}>Receive Payment</Text>
            <Text style={styles.description}>
              Receive Amount by sharing QR code or wallet Address
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Purchase HSR");
            onSelect();
          }}
        >
          <PurchaseIcon style={styles.icon} />
          <View style={{ flexDirection: "column", flex: 0.9 }}>
            <Text style={styles.buttonTitle}>Purchase HSR</Text>
            <Text style={styles.description}>
              Purchase HSR with USD using Stripe, Google Pay or Apple Pay.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Transaction History");
            onSelect();
          }}
        >
          <TransactionHistory style={{ marginRight: 10 }} />
          <Text style={styles.buttonTitle}>Transaction History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackBackground,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    overflow: "hidden",
    padding: correctSize(16),
    flex: 1,
  },
  rowContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: correctSize(16),
    fontFamily: "Poppins",
  },
  button: {
    backgroundColor: "#00000040",
    width: Dimensions.get("screen").width - correctSize(32),
    paddingVertical: correctSize(15),
    flex: 1,
    paddingHorizontal: correctSize(25),
    borderRadius: 28,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: correctSize(8),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomButton: {
    flexDirection: "row",
    backgroundColor: "#00000040",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: correctSize(8),
    borderRadius: 15,
  },
  buttonTitle: {
    flex: 0.9,
    fontSize: correctSize(13),
    color: "#fff",
    fontFamily: "Poppins",
  },
  icon: { marginRight: correctSize(10) },
  description: {
    fontFamily: "Poppins",
    fontSize: correctSize(11),
    lineHeight: 17,
    textAlign: "left",
    color: "#969696",
  },
});
