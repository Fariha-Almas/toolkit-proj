import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, correctSize } from "../../theme";
import Background from "../Background";
import LoginSignUpButton from "../../components/common/LoginSignUpButton";
import Verification from "../../components/common/Verification";
import { useNavigation } from "@react-navigation/core";
import PhoneInputField from "../../components/common/PhoneInputField";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

import {
  signupUser,
  userSelector,
  clearState,
  verifyCode,
  resendCode,
} from "../../redux/reducers/user";
export default function Signup() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [name, setName] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [value, setValue] = useState("");
  const [verification, setVerification] = useState(false);
  const { isFetching, isSuccess, isError, errorMessage, successMessage, token } =
    useSelector(userSelector);

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
        <Text style={styles.header}>Get Started</Text>
        <View style={styles.line} />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subHeader}>
            Already have an account?{" "}
            <Text style={{ color: colors.blackBackground, fontWeight: "700" }}>
              Login
            </Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.centerContainer}>
          {!verification && (
            <View style={styles.fieldContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={"First Name"}
                  value={name.first_name}
                  onChangeText={(text) =>
                    setName({ ...name, first_name: text })
                  }
                  selectionColor={colors.white}
                  placeholderTextColor={colors.white}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  value={name.last_name}
                  onChangeText={(text) => setName({ ...name, last_name: text })}
                  placeholder={"Last Name"}
                  placeholderTextColor={colors.white}
                  selectionColor={colors.white}
                  style={styles.input}
                />
              </View>
              <PhoneInputField
                number={name.phone}
                setNumber={(number) => setName({ ...name, phone: number })}
              />
            </View>
          )}
          {verification && (
            <Verification
              value={value}
              setValue={(value) => setValue(value)}
              resend={() => dispatch(resendCode())}
              message={successMessage}
            />
          )}
          <LoginSignUpButton
            disabled={isFetching}
            title="Next"
            onPress={() => {
              verification
                ? dispatch(verifyCode(value))
                : dispatch(signupUser(name));
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
  fieldContainer: {
    marginTop: correctSize(20),
    flexDirection: "column",
  },
  subHeader: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: correctSize(14),
    paddingTop: 10,
  },
  inputContainer: {
    borderBottomColor: colors.white,
    borderBottomWidth: 2,
    marginVertical: 20,
  },
  input: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontWeight: "700",
    fontSize: correctSize(14),
    paddingBottom: 10,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
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
