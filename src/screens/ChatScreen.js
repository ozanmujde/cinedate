/* Imports PubNub JavaScript and React SDKs to create and access PubNub instance accross your app. */
/* Imports the required PubNub Chat Components to easily create chat apps with PubNub. */
import React, { useEffect } from "react";
import ChatComponent from "../Components/ChatComponents/ChatComponent";
import ChatHeader from "../Components/ChatComponents/ChatHeader";
import PubNub from "pubnub";

// const pubnub = new PubNub({
//   publishKey: "pub-c-db5f1d5b-6ae2-49d4-a3de-78fa20d8843b",
//   subscribeKey: "sub-c-ac9d8622-a6cd-11ec-94c0-bed45dbe0fe1",
//   uuid: "Ozan",
//   autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
//   restore: true, // enable catchup on missed messages
// });
// import { PubNubProvider, usePubNub } from "pubnub-react";

const ChatScreen = (props) => {
  const navigation = props.navigation;
  const channelId = props.route.params.channelId;

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: () => <ChatHeader userId={userID} />,
  //   });
  // }, [userID]);

  return (
    // <PubNubProvider client={pubnub}>
    <ChatComponent channelId={channelId} />
    // </PubNubProvider>
  );
};

export default ChatScreen;
