import { StyleSheet, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Context as AuthContext } from "../context/AuthContext";
import wlobbyGetters from "../hooks/wlobbyGetters";

const ProfileScreen = ({ route: { params } }) => {
  const navigation = useNavigation();
  const [getUserData, userData, errorMessage] = wlobbyGetters();
  const userID = params.userID;
  // console.log(params);
  useEffect(() => {
    getUserData(userID);
  }, [userID]);
  // console.log("OMERRRRRRRRRRRRR",userData);
  console.log("ozann", userData);
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 50 }}>ProfileScreen</Text>
      <Text>{userData.UserID}</Text>
      <Text>keyif</Text>
      <Text>{userData.Name}</Text>
      <Text>{userData.Email}</Text>
      <Button
        style={styles.button}
        icon="logout"
        mode="contained"
        onPress={() => signout()}
      >
        Sign Out
      </Button>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
