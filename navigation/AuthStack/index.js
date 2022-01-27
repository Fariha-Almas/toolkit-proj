import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigator from "./BottomNavigator";
import { SafeAreaView } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";
import { colors } from "../../theme";
import CustomDrawerContent from "../../components/CustomDrawer";
import HomeIcon from "../../assets/customDrawer/HomeIcon";
import ProfileIcon from "../../assets/customDrawer/ProfileIcon";
import SettingIcon from "../../assets/customDrawer/SettingIcon";
import { correctSize } from "../../theme";
import Send from "../../containers/Send";
import Receive from "../../containers/Receive";
import Purchase from "../../containers/Purchase";
import Profile from "../../containers/Profile";
import Settings from "../../containers/Settings";
import TransactionHistory from "../../containers/TransactionHistory";
import Header from "../../components/CustomTabbar/Header";
import Lock from "../../containers/Lock";
import Coins from "../../containers/Coins";

import { useSelector } from "react-redux";

const Drawer = createDrawerNavigator();
const labelStyle = {
  color: "#fff",
  fontFamily: "Poppins",
  fontSize: correctSize(20),
  fontWeight: "600",
};

function MyStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return <Header title={title} navigation={navigation} back />;
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={BottomNavigator}
      />
      <Stack.Screen name="Send" component={Send} />
      <Stack.Screen name="Receive" component={Receive} />
      <Stack.Screen name="Purchase HSR" component={Purchase} />
      <Stack.Screen name="Transaction History" component={TransactionHistory} />
      <Stack.Screen name="Coins" component={Coins} />
    </Stack.Navigator>
  );
}

function Main() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.blackBackground }}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName="Home"
        screenOptions={{
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return <Header title={title} navigation={navigation} back />;
          },
        }}
      >
        <Drawer.Screen
          options={{
            drawerIcon: () => <HomeIcon />,
            drawerLabelStyle: labelStyle,
            drawerActiveTintColor: colors.blackBackground,
            headerShown: false,
          }}
          name="Home"
          component={MyStack}
        />
        <Drawer.Screen
          name="Profile"
          options={{
            drawerIcon: () => <ProfileIcon />,
            drawerLabelStyle: labelStyle,
            drawerActiveTintColor: colors.blackBackground,
          }}
          component={Profile}
        />
        <Drawer.Screen
          name="Settings"
          options={{
            drawerIcon: () => <SettingIcon />,
            drawerLabelStyle: labelStyle,
            drawerActiveTintColor: colors.blackBackground,
          }}
          component={Settings}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

const MainAuth = () => {
  const Stack = createNativeStackNavigator();
  const { verified } = useSelector((state) => state.wallet);
  return (
    <Stack.Navigator>
      {!verified && (
        <Stack.Screen
          name="Lock"
          component={Lock}
          options={{ headerShown: false }}
        />
      )}
      {verified && (
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainAuth;
