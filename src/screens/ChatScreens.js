import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import ChatPreview from "../Components/ChatComponents/ChatPreview";
import Users from "../../assets/Users";
import { Divider } from "react-native-elements";
import {  usePubNub } from "pubnub-react";

const ChatScreens = ({ navigation }) => {
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
    console.log("response",response);
  });


  return (
      <SafeAreaView style={styles.page} forceInset={{ top: "always" }}>
        <View>
          <FlatList
            data={Users}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  // console.log(item.id);
                  navigation.navigate("ChatScreen", {
                    userId: item.id - 1,
                  });
                }}
              >
                <ChatPreview userId={item.id - 1} />
                <Divider inset={true} insetType="left" />
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
