import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  View,
  Pressable,
} from "react-native";
import React from "react";
import ChatPreview from "../Components/ChatComponents/ChatPreview";
import Users from "../assets/Users";

const ChatScreens = () => {
  const id = 5;
  return (
    <SafeAreaView style={styles.page} forceInset={{ top: "always" }}>
      <View>
        <FlatList
          data={Users}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                console.log(item.id);
              }}
            >
              <ChatPreview userId={item.id - 1} />
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
