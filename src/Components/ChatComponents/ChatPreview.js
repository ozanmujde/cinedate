import React, { useEffect,useContext } from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { getUsers } from "../../hooks/wlobbyGetters";
import { SvgUri } from "react-native-svg";
import { AvatarGenerator } from "random-avatar-generator";
import {Context as AuthContext} from '../../context/AuthContext';
const TEMP_IMAGE =
  "https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Red&clotheType=Hoodie&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BlondeGolden&facialHairType=MoustacheFancy&hairColor=BlondeGolden&hatColor=PastelYellow&mouthType=Serious&skinColor=DarkBrown&topType=LongHairStraight";
const ChatPreview = (props) => {
  const channelId = props.channelId;
  const generator = new AvatarGenerator();
  const { state } = useContext(AuthContext);
  const [getUserData, userData, errorMessage] = getUsers();
  const myID = state.userID;
  const tmp = channelId.split("c");
  // console.log(generator.generateRandomAvatar());
  let otherID = tmp[0] === myID.toString() ? tmp[1] : tmp[0];
  // if (userData.LastLogIn) {
  //   const toStr = userData.LastLogIn.toString();
  //   const date = new Date(toStr);
  //   const dateString = date.toLocaleString("en-GB");
  //   console.log(dateString);
  // }
  useEffect(() => {
    getUserData(otherID);
  }, [channelId, userData]);

  function parseDate(LastLogIn) {
    let st = LastLogIn.split(" ")[0].split("-").reverse().join(".");
   // let st = "15.04.2022";
    let pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    let dt = new Date(st.replace(pattern,'$3-$2-$1')).toLocaleDateString("en-GB");
    let time = LastLogIn.split(" ")[1].split(".")[0].split(":")[0] + ":" + LastLogIn.split(" ")[1].split(".")[0].split(":")[1];

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const today = new Date();
    today.setDate(today.getDate());

    if(today.toLocaleDateString("en-GB") === dt) {
      return time;
    }
    if(yesterday.toLocaleDateString("en-GB") === dt) {
      dt = "Yesterday";
      return dt;
    }
    return dt;
  }

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <View style={styles.container}>
        <SvgUri
          width="60"
          height="60"
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
        {/* <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>4</Text>
        </View> */}
        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.userName}>
              {userData.Name} {userData.Surname}{" "}
            </Text>
            <Text style={styles.text}>
              {/* {userData.LastLogIn
                ? new Date(userData.LastLogIn.toString()).toLocaleString(
                    "en-GB"
                  )
                : " "} */}
              {userData.LastLogIn ? parseDate(userData.LastLogIn) : " "}
            </Text>
          </View>
          <Text style={styles.text} numberOfLines={1}>
            {userData.About}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatPreview;

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
