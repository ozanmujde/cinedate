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
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";

const pubnub = new PubNub({
  publishKey: "pub-c-db5f1d5b-6ae2-49d4-a3de-78fa20d8843b",
  subscribeKey: "sub-c-ac9d8622-a6cd-11ec-94c0-bed45dbe0fe1",
  uuid: "Ozan",
  autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
  restore: true, // enable catchup on missed messages
});

const ChatScreens = ({ navigation }) => {
  const id = 5;
  useEffect(() => {

  console.log(pubnub.getSubscribedChannels());
  }, []);
  return (
    <PubNubProvider client={pubnub}>
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
    </PubNubProvider>
  );
};

export default ChatScreens;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
