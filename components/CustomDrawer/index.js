import React, { useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/reducers/user";
import Background from "../../containers/Background";
import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import Cross from "../../assets/customDrawer/CrossIcon";
import PlaceholderImage from "../../assets/customDrawer/PlaceholderImage";
import { correctSize } from "../../theme";
import { userSelector } from "../../redux/reducers/user";
function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const { user, token } = useSelector(userSelector);

  useEffect(() => {
    if (!token) {
      props.navigation.navigate("Login");
    }
  }, [token]);
  return (
    <Background>
      <TouchableOpacity
        style={styles.cross}
        onPress={() => props.navigation.closeDrawer()}
      >
        <Cross />
      </TouchableOpacity>

      <DrawerContentScrollView {...props}>
        <View style={styles.placeholderImage}>
          {user?.profile_pic ? (
            <Image
              resizeMode="cover"
              style={styles.image}
              source={{ uri: user.profile_pic, cache: "force-cache" }}
            />
          ) : (
            <PlaceholderImage />
          )}
          <Text style={styles.name}>{`${user.display_name}`}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={() => dispatch(logout())}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "Poppins",
              fontSize: correctSize(20),
              fontWeight: "600",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  cross: { padding: 20 },
  logoutContainer: {
    padding: 20,
    margin: 20,
    borderTopWidth: 2,
    borderTopColor: "#fff",
  },
  placeholderImage: {
    alignSelf: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: "white",
  },
  name: {
    fontFamily: "Poppins",
    fontSize: correctSize(20),
    fontWeight: "600",
    marginVertical: correctSize(20),
    color: "#fff",
    textAlign: "center",
  },
});
