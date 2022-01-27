import React, { createRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View, Dimensions } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { getHeaderTitle } from "@react-navigation/elements";
import { Wallet } from "../../containers/Wallet";
import MyTabBar from "../../components/CustomTabbar";
import Header from "../../components/CustomTabbar/Header";
import SendReceive from "../../components/CustomTabbar/SendReceive";
import { colors, correctSize } from "../../theme";
import Exchange from "../../containers/Exchange";

const actionSheetRef = createRef();

export default function BottomNavigator({ navigation }) {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <ActionSheet
        containerStyle={{ flex: 1, backgroundColor: colors.backgroundColor }}
        ref={actionSheetRef}
      >
        <View
          style={{
            height: Dimensions.get("screen").height / 1.4,
            overflow: "hidden",
          }}
        >
          <SendReceive
            navigation={navigation}
            onSelect={() => actionSheetRef.current.setModalVisible(false)}
          />
        </View>
      </ActionSheet>
      <Tab.Navigator
        tabBar={(props) => (
          <MyTabBar
            {...props}
            onSwapPress={() => actionSheetRef.current?.setModalVisible()}
          />
        )}
        screenOptions={{
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return <Header title={title} navigation={navigation} />;
          },
        }}
      >
        <Tab.Screen name="My Wallet" component={Wallet} />
        <Tab.Screen name="Exchange" component={Exchange} />
      </Tab.Navigator>
    </>
  );
}
