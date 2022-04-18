import React, { useEffect, useContext } from "react";
import { Avatar } from "react-native-elements";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Users from "../../../assets/Users";
import { getUsers } from "../../hooks/wlobbyGetters";
import { SvgUri } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { Context as AuthContext } from "../../context/AuthContext";
const TEMP_IMAGE =
  "https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Red&clotheType=Hoodie&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BlondeGolden&facialHairType=MoustacheFancy&hairColor=BlondeGolden&hatColor=PastelYellow&mouthType=Serious&skinColor=DarkBrown&topType=LongHairStraight";
const ChatHeader = (props) => {
  const channelId = props.channelId;
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const [getUserData, userData, errorMessage] = getUsers();
  const myID = state.userID;
  const tmp = channelId.split("c");
  // console.log(generator.generateRandomAvatar());
  let otherID = tmp[0] === myID.toString() ? tmp[1] : tmp[0];
  // console.log("other", otherID);
  useEffect(() => {
    getUserData(otherID);
  }, [channelId, userData]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile", {
            userID: otherID,
          });
        }}
      >
        <SvgUri
          width="40"
          height="40"
          uri={
            userData.ProfilePhoto
              ? userData.ProfilePhoto.charAt(0) == "h"
                ? userData.ProfilePhoto
                : TEMP_IMAGE
              : TEMP_IMAGE
          }
          style={{
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>

      <Text style={styles.userName}>
        {userData.Name} {userData.Surname}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // can be center or flex-start
    width: "100%",
    // padding: 5,
  },
  userName: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 5,
    alignItems: "center",
    // backgroundColor: "red",
  },
});

export default ChatHeader;
