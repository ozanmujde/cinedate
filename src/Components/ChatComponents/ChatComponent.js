import { GiftedChat } from "react-native-gifted-chat";
import React, { Component } from "react";
import Users from "../../../assets/Users";

export default class ChatComponent extends Component {
  state = { messages: [] };
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: Users[0].imageUri,
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{ _id: 1 }}
      />
    );
  }
}
