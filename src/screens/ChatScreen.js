/* Imports PubNub JavaScript and React SDKs to create and access PubNub instance accross your app. */
/* Imports the required PubNub Chat Components to easily create chat apps with PubNub. */
import React from "react";
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat, MessageList, MessageInput } from "@pubnub/react-chat-components";
import { GiftedChat } from 'react-native-gifted-chat'
import { Text } from "react-native-paper";
import ChatComponent from "../Components/ChatComponents/ChatComponent";
/* Creates and configures your PubNub instance. Be sure to replace "myPublishKey" and "mySubscribeKey"
  with your own keyset. If you wish, modify the default "myFirstUser" uuid value for the chat user. */
const pubnub = new PubNub({
  publishKey: "pub-c-db5f1d5b-6ae2-49d4-a3de-78fa20d8843b",
  subscribeKey: "sub-c-ac9d8622-a6cd-11ec-94c0-bed45dbe0fe1",
  uuid: "myFirstUser",
});
const currentChannel = "Default";
const theme = "light";

const ChatScreen = () => {
  return (
    <>
    <ChatComponent />
    </>
  );
};

export default ChatScreen;
