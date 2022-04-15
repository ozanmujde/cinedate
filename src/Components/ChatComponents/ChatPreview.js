import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Avatar, Text } from "react-native-elements";
import Users from "../../../assets/Users";

const ProfileScreen = (props) => {
  const id = props.userId;
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.container}>
        <Avatar
          rounded
          size={60}
          title={Users[id].name}
          source={{
            uri: Users[id].imageUri,
          }}
        />
        {/* <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>4</Text>
        </View> */}
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.userName}>{Users[id].name}</Text>
            <Text style={styles.text}> 11:11</Text>
          </View>
          <Text style={styles.text} numberOfLines={1}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            lobortis justo sed sapien faucibus fermentum.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  badgeContainer: {
    backgroundColor: "#3872E8",
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 65,
    top: 10,
  },
  text: {
    fontSize: 12,
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightContainer: {
    flex: 1,
    // marginLeft: 10,
  },
});
