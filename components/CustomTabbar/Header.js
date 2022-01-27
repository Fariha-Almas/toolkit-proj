import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import DrawerIcon from "../../assets/common/DrawerIcon.js";
import NotificationIcon from "../../assets/common/NotificationIcon.js";
import Back from "../../assets/common/Back.js";

import { correctSize, colors } from "../../theme";
function Header({ navigation, title, back }) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
        onPress={() => {
          back ? navigation.goBack() : navigation.openDrawer();
        }}
      >
        {back ? <Back /> : <DrawerIcon />}
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity>
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  );
}

export default Header;
const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: correctSize(20),
    backgroundColor: colors.blackBackground,
  },
  headerTitle: {
    fontSize: correctSize(18),
    color: "#fff",
    fontFamily: "Poppins",
    textAlign: "center",
  },
});
