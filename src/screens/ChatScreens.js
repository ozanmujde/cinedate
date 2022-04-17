import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import ChatPreview from "../Components/ChatComponents/ChatPreview";
import Users from "../../assets/Users";
import { Divider } from "react-native-elements";
import { usePubNub } from "pubnub-react";
import axios from "axios";
import { getAdverts } from "../hooks/wlobbyGetters";

const ChatScreens = ({ navigation }) => {
  // const [users, setUsers] = useState([]);
  // const [advertIDs, setAdvertIDs] = useState([]);
  // const [getAdvertsData, adverts, errorMessage, loading] = getAdverts();
  // const [uniqueUsers, setUniqueUsers] = useState([]);
  let channels = [];
  const [finalChannels, setFinalChannels] = useState([]);
  useEffect(() => {
    // getUsersData();
    // getAdvertsData();
  }, []);
  const pubnub = usePubNub();
  // const [getUserData, userData, getUsersData, usersData, errorMessageUser] =
  //   getUsers();
  // const [channels, setChannels] = useState([]);

  const getUniqueUsers = async () => {
    let uniqueUsers = [];
    try {
      const res = await axios.get(
        "https://wlobby-backend.herokuapp.com/get/user/adverts/?UserID=7"
      );
      res.data.Items.map((item) => {
        Object.keys(item.AttendeeIDs).map((key) => {
          if (uniqueUsers.indexOf(key) === -1 && key !== "7") {
            uniqueUsers.push(key);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
    return uniqueUsers;
  };

  getUniqueUsers().then((users) => {
    // console.log("channels", channels);
    let idArr = [];
    let fullidArr = [];
    let newChannels = [];
    for (let user of users) {
      //TODO: AUth gelince duzelt
      idArr.push("7" + " " + user.toString());
    }
    pubnub.objects.getMemberships(
      {
        uuid: "Ozan",
        include: "custom",
        count: 50,
        page: 1,
        includeCount: true,
        includeCustom: true,
        includeUUIDField: true,
        withPresence: true,
        filter: "",
        sort: "",
      },
      function (status, response) {
        // console.log("response", response);
        response.data.map((element) => {
          // console.log("element", element);
          channels.push(element.channel.id);
        });
        // console.log("channels", channels);
        // console.log("ids", idArr);
        for (let id of idArr) {
          const tmp = id.split(" ");
          console.log("tmp", tmp);
          fullidArr.push(tmp[0] + "c" + tmp[1]);
          fullidArr.push(tmp[1] + "c" + tmp[0]);
        }
        // console.log("fullids", fullidArr);
        for (let i = 0; i <= fullidArr.length - 2; i += 2) {
          if (
            !channels.includes(fullidArr[i]) &&
            !channels.includes(fullidArr[i + 1])
          ) {
            console.log("--------------------");
            console.log("fullid+1", fullidArr[i + 1]);
            console.log("fullid+1", channels.includes(fullidArr[i + 1]));
            console.log("channels", channels);
            console.log("fullid", channels.includes(fullidArr[i]));
            console.log("fullid", fullidArr[i]);
            newChannels.push(fullidArr[i]);
            console.log("--------------------");
          }
        }
        // console.log("newChannels", newChannels);
        for (let channel of newChannels) {
          const tmp = channel.split("c");
          console.log("tmp", tmp);
          pubnub.objects.setMemberships({
            channels: [channel],
            uuids: [tmp[0], tmp[1]],
          });
        }
        pubnub.objects.getMemberships(
          {
            uuid: "Ozan",
            include: "custom",
            count: 50,
            page: 1,
            includeCount: true,
            includeCustom: true,
            includeUUIDField: true,
            withPresence: true,
            filter: "",
            sort: "",
          },
          function (status, response) {
            response.data.map((element) => {
              // console.log("element", element);
              if (!finalChannels.includes(element.channel.id)) {
                setFinalChannels([...finalChannels, element.channel.id]);
              }
            });
            console.log("finalChannels", finalChannels);
          }
        );
      }
    );
  });
  // if (!loading) {
  //   console.log("users", users);
  //   console.log("adverts", adverts);
  // }

  return (
    <SafeAreaView style={styles.page} forceInset={{ top: "always" }}>
      <View>
        <FlatList
          data={finalChannels}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                // console.log(item.id);
                const myID = 7;
                const tmp = item.split("c");
                let otherID = tmp[0] == myID ? tmp[1] : tmp[0];
                navigation.navigate("ChatScreen", {
                  //TODO: AUth gelince degistir
                  channelId: item,
                  otherID: otherID,
                });
              }}
            >
              <ChatPreview channelId={item} />
              <Divider inset={true} insetType="left" />
            </Pressable>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreens;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
