import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppIntro from "../containers/AppIntro";
import UnAuthStack from "./UnAuthStack";
import AuthStack from "./AuthStack";
import FreshLogin from "../containers/FreshLogin";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/reducers/user";
const Stack = createNativeStackNavigator();

function Navigation() {
  const { token, firstRun, freshLogin } = useSelector(userSelector);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
          { freshLogin ? <Stack.Screen name="FreshLogin" component={FreshLogin} /> : null }
          <Stack.Screen name="AuthStack" component={AuthStack} />
          </>
        ) : (
          <>
            { firstRun ? <Stack.Screen name="AppIntro" component={AppIntro} /> : null }
            <Stack.Screen name="UnAuthStack" component={UnAuthStack} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
