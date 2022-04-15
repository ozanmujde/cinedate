import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Platform } from "react-native";
import Users from "../../../assets/Users";

const ChatComponent = (props) => {
  const pubnub = usePubNub();
  const str = props.userId + "Ozan";
  // console.log(props);
  const [messages, setMessages] = useState([]);
  const [channels] = useState([str]);
  useEffect(() => {
    pubnub.fetchMessages(
      {
        channels: [channels[0]],
        // end: '15343325004275466',
        count: 25, // default/max is 25 messages for multiple channels (up to 500)
      },
      function (status, response) {
        setMessages(response.channels[channels[0]].map((item) => item.message));
      }
    );
  }, [channels]);

  console.log(messages);
  // const [messages, setMessages] = useState(messageRespound);
  // console.log(messageRespound);
  const [message, setMessage] = useState("");
  const handleMessage = (event) => {
    const message = event.message;
    if (typeof message === "string" || message.hasOwnProperty("text")) {
      const text = message.text || message;
      addMessage((messages) => [...messages, message]);
    }
  };
  useEffect(() => {
    pubnub.addListener({
      message: function (receivedMessage) {
        // handle message
        // console.log("message", message);
        // console.log("The message text is: ", receivedMessage);

        setMessages((messages) => [receivedMessage.message, ...messages]);
        // addMessage((previousMessages) =>
        //   GiftedChat.append(previousMessages, messages)
        // );
      },
    });
    pubnub.subscribe({ channels: [channels[0]], withPresence: true });
    // pubnub.fetchMessages({
    //   channels: channels[0],
    //   end: '15343325004275466',
    //   count: 100,
    // });
    return () => {
      // pubnub.removeListener(listener);
      pubnub.unsubscribeAll();
    };
  }, [pubnub, channels]);

  const sendMessage = useCallback((message) => {
    // if (message) {
    // const message = [
    //   messages[0],
    //   {
    //     name: Users[props.userId].name,
    //     avatar: Users[props.userId].imageUri,
    //   },
    // ];
    // console.log("message", message);
    // console.log(Users);
    // message[0].user = {
    //   _id: message[0].user._id,
    //   name: Users[props.userId].name,
    //   avatar: Users[props.userId].imageUri,
    // };
    console.log("channels", channels);
    pubnub
      .publish({
        message: message[0],
        channel: channels[0],
        sendBy: props.userId,
      })
      .then(() => setMessage(""));
  }, []);
  // useEffect(() => {
  //   setMessage([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);
  // const onSend = useCallback((messages = []) => {
  //   setMessage((previousMessages) =>
  //     GiftedChat.append(previousMessages, messages)
  //   );
  // }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <GiftedChat
        messages={messages}
        onSend={sendMessage}
        user={{
          _id: Platform.OS === "ios" ? 1 : 0,
        }}
        sendOnEnter={true}
        style={{
          backgroundColor: "white",
        }}
        renderSend={renderSend}
      />
    </View>
  );
};

const renderSend = (props) => {
  return (
    <Send {...props}>
      <View style={{ marginRight: 5, marginBottom: 5 }}>
        <MaterialCommunityIcons name="send-circle" color="#0782F9" size={32} />
      </View>
    </Send>
  );
};

export default ChatComponent;
