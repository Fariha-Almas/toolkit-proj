import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Receive from "../../assets/appIntro/receive.png";
import Send from "../../assets/appIntro/send.png";
import Control from "../../assets/appIntro/control.png";
import Exchange from "../../assets/appIntro/exchange.png";
import { colors, correctSize } from "../../theme";
import Background from "../Background";
import { useNavigation } from "@react-navigation/core";
import { changeFirstRun } from "../../redux/reducers/user";

const slides = [
  {
    key: 1,
    title: "Receive",
    text: "Receive crypto by scanning or sharing your unique QR code or address",
    image: Receive,
  },
  {
    key: 2,
    title: "Send",
    text: "Send crypto in a few taps by scanning a QR code or pasting an address",
    image: Send,
  },
  {
    key: 3,
    title: "Exchange",
    text: "Instantly swap your crypto with 75+ other assets securely from your wallet",
    image: Exchange,
  },
  {
    key: 4,
    title: "Control your Wealth",
    text: "Funds are under your control and your privacy is protected",
    image: Control,
  },
];

const AppIntro = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            style={styles.image}
            source={item.image}
          />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  const _onDone = () => {
    dispatch(changeFirstRun())
    navigation.navigate("UnAuthStack");
  };

  return (
    <Background>
      <AppIntroSlider
        showSkipButton
        onSkip={_onDone}
        renderItem={_renderItem}
        data={slides}
        onDone={_onDone}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  slide: { flex: 1 },
  imageContainer: {
    flex: 0.45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: colors.black,
    width: "150%",
    overflow: "hidden",
    borderBottomEndRadius: Dimensions.get("window").width,
    borderBottomStartRadius: Dimensions.get("window").width,
    zIndex: 1000,
  },
  image: {
    width: 200,
  },
  title: {
    alignSelf: "center",
    marginVertical: correctSize(16),
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: correctSize(30),
    fontWeight: "bold",
  },
  text: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: correctSize(15),
    fontFamily: "Poppins",
    width: "80%",
    color: "#fff",
    lineHeight: 25,
  },
});

//convert App component into functional component

export default AppIntro;
