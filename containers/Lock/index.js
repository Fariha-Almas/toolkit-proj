import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as LocalAuthentication from "expo-local-authentication";
import { userSelector, verify2FA } from "../../redux/reducers/user";
import { colors, correctSize } from "../../theme";
import Logo from "../../assets/common/Logo";
import FingerIcon from "../../assets/common/FingerIcon";
import FaceIcon from "../../assets/common/FaceIcon";
import { setVerify } from "../../redux/reducers/wallet";
import Verification from "../../components/common/Verification";
import Button from "../../components/common/Button";

const Lock = (props) => {
  const [value, setValue] = useState("");
  const { mPin, fingerPrint, faceId, mPinEnabled, user, isSuccess } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  const face = "Use Face ID to access your account";
  const finger = "Use Touch ID/Finger Print to access your account";
  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        cancelLabel: "Cancel",
        disableDeviceFallback: true,
      });
      if (result.success) {
        dispatch(setVerify(true));
      }
    } catch (e) {
      console.warn(e);
    }
  };
  useEffect(() => {
    if (!user.two_factor_authentication) {
      if (fingerPrint || faceId) {
        handleBiometricAuth();
      } else if (mPin) {
      } else {
        dispatch(setVerify(true));
      }
    }
  }, []);
  const validatePin = () => {
    if (mPin === value && mPin.length === 6) {
      dispatch(setVerify(true));
    } else {
      alert("Invalid PIN");
      setValue("");
    }
  };
  const verifyCode = async () => {
    await dispatch(verify2FA({ id: user.id, code: value }));
    if (isSuccess) {
      dispatch(setVerify(true));
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {user.two_factor_authentication ? (
        <View style={styles.mPinContainer}>
          <Verification
            message="Please enter your 2FA code."
            setValue={setValue}
            value={value}
          />
          <Button text="Let me in" onPress={() => verifyCode()} />
        </View>
      ) : mPinEnabled ? (
        <View style={styles.mPinContainer}>
          <Verification
            message="Please enter your PIN."
            setValue={setValue}
            value={value}
          />
          <Button text="Let me in" onPress={validatePin} />
        </View>
      ) : null}
      {(fingerPrint || faceId) && (
        <>
          <View style={styles.logoContainer}>
            <Logo />
            <Text style={styles.title}>
              {faceId && face} {fingerPrint && finger}
            </Text>
          </View>
          <View style={styles.bottomIcon}>
            {faceId && <FaceIcon />}
            {fingerPrint && <FingerIcon />}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackBackground,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mPinContainer: {
    flex: 1,
    marginHorizontal: correctSize(20),
    marginVertical: correctSize(100),
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: correctSize(100),
  },
  title: {
    fontFamily: "Montserrat",
    fontSize: correctSize(18),
    color: "#969696",
    width: "70%",
    textAlign: "center",
    marginTop: correctSize(22),
  },
  bottomIcon: {
    alignSelf: "center",
  },
});

export default Lock;
