import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, correctSize } from "../../theme";
import Background from "../Background";
import LoginSignUpButton from "../../components/common/LoginSignUpButton";
import Verification from "../../components/common/Verification";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import PhoneInputField from "../../components/common/PhoneInputField";
import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  userSelector,
  clearState,
  resendCode,
  verifyLogin,
  verify2FA,
} from "../../redux/reducers/user";
export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [phone, setPhone] = useState("");
  const [verification, setVerification] = useState(false);
  const [value, setValue] = useState("");
  const {
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    successMessage,
    token,
    user,
  } = useSelector(userSelector);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      if (isSuccess) {
        dispatch(clearState());
        setVerification(true);
      }

      if (isError) {
        alert(errorMessage);
        dispatch(clearState());
      }
    }
  }, [isSuccess, isError, isFocused]);

  useEffect(() => {
    if (token) {
      navigation.navigate("AuthStack");
    }
  }, [token]);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Log In to your account </Text>
        <View style={styles.line} />
        {/* <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.subHeader}>
            New User?{" "}
            <Text style={{ color: colors.blackBackground, fontWeight: "700" }}>
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity> */}
        <View style={styles.centerContainer}>
          {!verification && (
            <PhoneInputField
              number={phone}
              setNumber={(number) => setPhone(number)}
            />
          )}
          {verification && (
            <Verification
              value={value}
              setValue={(value) => setValue(value)}
              onPress={() => dispatch(resendCode())}
              message={successMessage}
            />
          )}
          {verification && (
            <TouchableOpacity onPress={() => setVerification(false)}>
              <Text style={[styles.header, { fontSize: correctSize(15) }]}>
                Change number?
              </Text>
            </TouchableOpacity>
          )}
          <LoginSignUpButton
            disabled={isFetching}
            title="Next"
            onPress={() => {
              verification
                ? user.two_factor_authentication
                  ? dispatch(verify2FA({ id: user.id, code: value }))
                  : dispatch(verifyLogin(value, navigation))
                : dispatch(loginUser(phone));
            }}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: correctSize(20),
  },
  subHeader: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: correctSize(14),
    paddingTop: 10,
  },
  header: {
    fontSize: correctSize(25),
    marginTop: correctSize(20),
    fontWeight: "bold",
    color: "#fff",
  },
  line: {
    height: correctSize(4),
    marginTop: correctSize(30),
    backgroundColor: "#fff",
    width: correctSize(50),
  },
});
