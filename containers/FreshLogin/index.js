import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { colors, correctSize } from "../../theme";
import PlaceholderImage from "../../assets/customDrawer/PlaceholderImage";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import {
  userSelector,
  updateProfile,
  updateUser,
  imageUpload,
  clearState,
} from "../../redux/reducers/user";
export default function FreshLogin(props) {
  const {
    user,
    token,
    freshLogin,
    isSuccess,
    isError,
    isFetching,
    errorMessage,
  } = useSelector(userSelector);
  const dispatch = useDispatch();

  const changeUser = (name, value) => {
    let temp = { ...user, [name]: value };
    dispatch(updateUser(temp));
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      if (result.uri) {
        dispatch(imageUpload(result));
      }
    }
  };

  useEffect(() => {
    if (isError) {
      alert(errorMessage);
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (!freshLogin) {
      props.navigation.navigate("AuthStack");
    }
  }, [freshLogin]);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {isFetching ? (
          <ActivityIndicator />
        ) : user?.profile_pic ? (
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: user.profile_pic, cache: "force-cache" }}
          />
        ) : (
          <PlaceholderImage />
        )}
      </TouchableOpacity>
      <View style={{ marginTop: correctSize(20) }}>
        <View style={{ marginBottom: correctSize(20) }}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            selectionColor="#fff"
            value={`${user.display_name || ""}`}
            onChangeText={(e) => changeUser("display_name", e)}
          />
        </View>
      </View>
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          style={styles.logoutButton}
          disabled={isFetching}
          onPress={() =>
            dispatch(
              updateProfile({
                display_name: user.display_name,
                profile_pic: user?.profile_pic || null,
                token,
              })
            )
          }
        >
          <Text style={styles.logout}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackBackground,
    padding: correctSize(32),
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "white",
  },
  imageContainer: {
    flex: 0.25,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: colors["light-gray"],
    marginBottom: correctSize(8),
    fontSize: correctSize(13),
    fontFamily: "Poppins",
  },
  input: {
    color: "#fff",
    fontSize: correctSize(14),
    fontFamily: "Poppins",
    borderBottomColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logout: {
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: correctSize(20),
  },
  logoutButton: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors["light-gray"],
    paddingBottom: correctSize(6),
  },
});
