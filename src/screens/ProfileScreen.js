import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { Divider } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { getUsers } from "../hooks/wlobbyGetters";
import FilmList from "../Components/ProfileComponents/FilmList";
import AutomaticFilmList from "../Components/ProfileComponents/AutomaticFilmList";
import { ScrollView } from "react-native-gesture-handler";
import LoadingIndicator from "../Components/LoadingIndicatior";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = ({ route: { params } }) => {
  // console.log(params);
  const userID = params.userID;
  const navigation = useNavigation();
  const [getUserData, userData, errorMessage] = getUsers();
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getUserData(userID);
  }, [userID]);

  const onRefresh = (userID) => {
    setRefreshing(true);
    navigation.navigate("Profile", { userID });
    setRefreshing(false);
  };

  const { signout } = useContext(AuthContext);
  // console.log("userID", userID);
  // console.log("userData", userData);
  // console.log("userData", userData);
  return (
    <SafeAreaView
      // forceInset={{ top: "always" }}
      style={{ flex: 1, backgroundColor: "#fff" }}
    >
      {Object.keys(userData).length !== 0 ? (
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            justifyContent: "center",
            // alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh(7)}
            />
          }
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              style={styles.userImg}
              source={{
                uri: userData
                  ? "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
                  : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
              }}
            />
          </View>
          <Text style={styles.userName}>
            {Object.keys(userData).length !== 0
              ? userData.Name || "Test"
              : "Test"}{" "}
            {Object.keys(userData).length !== 0
              ? userData.Surname || "User"
              : "User"}
          </Text>
          <Text style={styles.AgeLocation}>
            {Object.keys(userData).length !== 0
              ? userData.Age || "Age is not given"
              : "Age is not given"}
            {", "}
            {Object.keys(userData).length !== 0
              ? userData.Location || "Location is not given"
              : "Location is not given"}
          </Text>
          <Text style={styles.aboutUser}>
            {Object.keys(userData).length !== 0
              ? userData.About || "No details added"
              : ""}
          </Text>
          <Text style={styles.bio}>
            {Object.keys(userData).length !== 0
              ? userData.Bio || "No details added"
              : ""}
          </Text>
          <Text style={styles.Interest}>
            {Object.keys(userData).length !== 0
              ? userData.Interests.join(" ") || "No Interest added"
              : " "}
          </Text>
          <Divider orientation="horizontal" />
          {/* <Text>{userData.UserID}</Text> */}
          <Text style={styles.SubTitle}>Liked</Text>
          <FilmList filmList={userData.LikedFilms} />
          <Text style={styles.SubTitle}>Watched</Text>
          <FilmList filmList={userData.WatchedFilms} />
          <Text style={styles.SubTitle}>Adverts</Text>
          <AutomaticFilmList advertList={userData.AdvertIDs} />
          <Button
            style={styles.button}
            icon="logout"
            mode="contained"
            onPress={() => signout()}
          >
            Sign Out
          </Button>
          {/* TODO: Burasi auth la degismeli */}
          {userID === 7 ? (
            <Button
              style={styles.button}
              icon="cog-outline"
              mode="contained"
              onPress={() =>
                navigation.navigate("ProfileSettings", {
                  userData,
                })
              }
            >
              Profile Settings
            </Button>
          ) : null}
        </ScrollView>
      ) : (
        <View style={styles.loadingContainer}>
          <LoadingIndicator size={100} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 14,
    fontWeight: "600",
    // color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  AgeLocation: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
  },
  bio: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  Interest: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    // textAlign: "center",
    marginBottom: 10,
  },
  SubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
