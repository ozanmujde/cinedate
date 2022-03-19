import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, Send } from "react-native-gifted-chat";
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";

const pubnub = new PubNub({
  publishKey: "pub-c-db5f1d5b-6ae2-49d4-a3de-78fa20d8843b",
  subscribeKey: "sub-c-ac9d8622-a6cd-11ec-94c0-bed45dbe0fe1",
  uuid: "Ozan",
  autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
  restore: true, // enable catchup on missed messages
});

const Chat = () => {
  const pubnub = usePubNub();
  const [channels] = useState(["ch-1"]);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    const message = event.message;
    if (typeof message === "string" || message.hasOwnProperty("text")) {
      const text = message.text || message;
      addMessage((messages) => [...messages, message]);
    }
  };
  useEffect(() => {
    // pubnub.addListener({ message: handleMessage });
    // addMessage(
    //   pubnub.fetchMessages({
    //     channels: ["ch-1"],
    //     count: 100,
    //   })
    // );
    pubnub.addListener({
      message: function (receivedMessage) {
        // handle message
        console.log("The message text is: ", receivedMessage.message);
        console.log("Sent by: ", receivedMessage.publisher);
        addMessage((messages) => [receivedMessage.message, ...messages]);
        // addMessage(...messages, [receivedMessage.message]);
      },
    });
    pubnub.subscribe({ channels });
  }, [pubnub, channels]);

  const sendMessage = (messages = []) => {
    // if (message) {
    pubnub.publish({ message: messages[0], channel: channels[0] });
    // .then(() => setMessage(""));
    // }
    // console.log(pubnub);
    // console.log("messages", messages);
    // console.log("message", message);
  };
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
  const onSend = useCallback((messages = []) => {
    pubnub.publish({ message: messages, channel: channels[0] });
    console.log(messages);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor:'white'}}>
      <GiftedChat
        messages={messages}
        onSend={sendMessage}
        user={{
          _id: 2,
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

const ChatComponent = () => {
  return (
    <PubNubProvider client={pubnub}>
      <Chat />
    </PubNubProvider>
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
