import React from "react";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import { View, StatusBar } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat.ttf"),
    Poppins: require("./assets/fonts/Poppins.ttf"),
  });
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
          <Navigation />
        </View>
      </PersistGate>
    </Provider>
  );
}
