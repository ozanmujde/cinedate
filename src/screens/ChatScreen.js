/* Imports PubNub JavaScript and React SDKs to create and access PubNub instance accross your app. */
/* Imports the required PubNub Chat Components to easily create chat apps with PubNub. */
import React, { useEffect } from "react";
import ChatComponent from "../Components/ChatComponents/ChatComponent";
import ChatHeader from "../Components/ChatComponents/ChatHeader";
const ChatScreen = (props) => {
  const navigation = props.navigation;
  const userID = props.route.params.userId;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ChatHeader userId={userID} />,
    });
  }, [userID]);

  return (
    <>
      <ChatComponent />
    </>
  );
};

export default ChatScreen;
