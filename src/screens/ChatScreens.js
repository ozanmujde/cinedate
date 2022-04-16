import {FlatList, Pressable, SafeAreaView, StyleSheet, View,} from "react-native";
import React, {useEffect} from "react";
import ChatPreview from "../Components/ChatComponents/ChatPreview";
import Users from "../../assets/Users";
import {Divider} from "react-native-elements";
import {usePubNub} from "pubnub-react";
import axios from "axios";
import {getAdverts} from "../hooks/wlobbyGetters";

const ChatScreens = ({navigation}) => {
  const pubnub = usePubNub();
  pubnub.objects.getMemberships({
        uuid: "Ozan",
        include: "custom",
        count: 10,
        page: 1,
        includeCount: true,
        includeCustom: true,
        includeUUIDField: true,
        withPresence: true,
        filter: "",
        sort: "",
      },
      function (status, response) {
        // console.log("response",response);
      });

  const [users, setUsers] = React.useState([]);
  const [advertIDs, setAdvertIDs] = React.useState([]);
  const [getAdvertsData, adverts, errorMessage, loading] = getAdverts();

  const getUsers = () => {
    getAdvertsData();
    console.log("bu kod çalıştı")
    axios.get('https://wlobby-backend.herokuapp.com/get/users/')
        .then(res => {
          setUsers(res.data.Items);
          users.map(user => {
            if (user.UserID === 7) {
              for (let id of user.AdvertIDs) {
                if (!advertIDs.includes(id)) {
                  advertIDs.push(id);
                }
              }
            }
          })
        })
        .catch(err => {
          console.log(err);
        })
    let uniqueUsers = [];
    for(let id of advertIDs) {
      for(let advert of adverts) {
        if(advert.AdvertID === id) {
          for(let attendee of Object.keys(advert.AttendeeIDs)){
            if(!uniqueUsers.includes(attendee)) {
              uniqueUsers.push(attendee);
            }
          }
          }
        }
      }
    return uniqueUsers;
    }

  useEffect(() => {
    getUsers();
  }, []);

  return (
      <SafeAreaView style={styles.page} forceInset={{top: "always"}}>
        <View>
          <FlatList
              data={Users}
              renderItem={({item}) => (
                  <Pressable
                      onPress={() => {
                        // console.log(item.id);
                        navigation.navigate("ChatScreen", {
                          userId: item.id - 1,
                        });
                      }}
                  >
                    <ChatPreview userId={item.id - 1}/>
                    <Divider inset={true} insetType="left"/>
                  </Pressable>
              )}
              keyExtractor={(item) => item.id}
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
