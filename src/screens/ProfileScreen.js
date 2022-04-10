import { StyleSheet, Text, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Context as AuthContext } from "../context/AuthContext";
import wlobbyGetters from "../hooks/wlobbyGetters";
import FilmList from "../Components/ProfileComponents/FilmList";
const ProfileScreen = ({ route: { params } }) => {
  console.log(params);
  const userID = params.userID;
  const [getUserData, userData, errorMessage] = wlobbyGetters();
  useEffect(() => {
    getUserData(userID);
  }, [userID]);
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{ fontSize: 50 }}>ProfileScreen</Text>

      <Text>{userData.UserID}</Text>
      <Text>LikedFilms</Text>
      <FilmList filmList={userData.LikedFilms} />
      <Text>WatchedFilms</Text>
      <FilmList filmList={userData.WatchedFilms} />
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

ProfileScreen.defaultProps = {
  params: {
    userID: 10,
  },
};

const styles = StyleSheet.create({});

export default ProfileScreen;
