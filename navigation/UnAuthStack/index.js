import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../containers/Login";
import SignUp from "../../containers/SignUp";
export default function UnAuthStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name={"SignUp"} component={SignUp} /> */}
      <Stack.Screen name={"Login"} component={Login} />
    </Stack.Navigator>
  );
}
