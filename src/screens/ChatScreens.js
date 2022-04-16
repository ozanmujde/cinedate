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

  const getUniqUsers = async () => {
    let uniqueUsers = [];
    try {
      const res = await axios.get(
        "https://wlobby-backend.herokuapp.com/get/users/"
      );

      let userData = res.data.Items;

      let advertIDs = [];
      userData.map((user) => {
        // console.log("user", user);
        if (user.UserID === 7) {
          // console.log(user.AdvertIDs);
          for (let id of user.AdvertIDs) {
            // console.log(id);
            if (!advertIDs.includes(id)) {
              // console.log("hey", id);
              advertIDs.push(id);
            }
          }
        }
      });
      const response = await axios.get(
        "https://wlobby-backend.herokuapp.com/get/adverts/"
      );
      let adverts = response.data.Items;
      for (let id of advertIDs) {
        for (let advert of adverts) {
          if (advert.AdvertID === id) {
            for (let attendee of Object.keys(advert.AttendeeIDs)) {
              if (!uniqueUsers.includes(attendee)) {
                uniqueUsers.push(attendee);
              }
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
    return uniqueUsers;
  };

  getUniqUsers().then((users) => {
    console.log("users", users);
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
        console.log("channels", channels);
        console.log("ids", idArr);
        for (let id of idArr) {
          const tmp = id.split(" ");
          // console.log("tmp", tmp);
          fullidArr.push(tmp[0] + "c" + tmp[1]);
          fullidArr.push(tmp[1] + "c" + tmp[0]);
        }
        console.log("fullids", fullidArr);
        for (let i = 0; i < fullidArr.length - 1; i++) {
          if (
            !channels.includes(fullidArr[i]) &&
            !channels.includes(fullidArr[i + 1])
          ) {
            newChannels.push(fullidArr[i]);
          }
        }
        console.log("newChannels", newChannels);
        for (let channel of newChannels) {
          const tmp = channel.split("c");
          // console.log("tmp", tmp);
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
                navigation.navigate("ChatScreen", {
                  channelId: item,
                });
              }}
            >
              <ChatPreview userId={item} />
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
