import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import WalletIcon from "../../assets/customTabbar/WalletIcon";
import ExchangeIcon from "../../assets/customTabbar/ExchangeIcon";
import Swap from "../../assets/customTabbar/SwapIcon";

function MyTabBar({ state, descriptors, navigation, onSwapPress }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
          >
            {index == 0 ? (
              <WalletIcon isFocused={isFocused} />
            ) : index == 1 ? (
              <ExchangeIcon isFocused={isFocused} />
            ) : null}
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity onPress={onSwapPress} style={styles.centerButton}>
        <Swap />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#333333",
    height: 70,
    justifyContent: "space-between",
  },
  button: {
    width: "33.33%",
    justifyContent: "center",
    alignItems: "center",
  },
  centerButton: {
    position: "absolute",
    left: "41%",
    top: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
});

export default MyTabBar;
