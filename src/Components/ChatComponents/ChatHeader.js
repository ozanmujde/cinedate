import React from "react";
import { Avatar } from "react-native-elements";
import { View, StyleSheet, Text } from "react-native";
import Users from "../../../assets/Users";
const ChatHeader = (props) => {
  const userId = props.userId;
  console.log(userId);
  console.log(Users[userId]);
  return (
    <View style={styles.container}>
      <Avatar
        rounded
        size={39}
        source={{
          uri: Users[userId].imageUri,
        }}
      />
      <Text style={styles.userName}>{Users[userId].name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start", // can be center or flex-start
    width: "100%",
    // padding: 5,
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
  },

});

export default ChatHeader;
