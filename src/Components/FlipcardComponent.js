import React, { Component, useState } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import FlipCard from "react-native-flip-card-plus";

export default class FlipcardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: "",
    };
    this.card = React.createRef();
    this.footer = React.createRef();
  }
  componentDidUpdate(props) {
    if (this.card.state.side === 1) {
      this.card.flipHorizontal();
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlipCard
          flipDirection={"h"}
          style={styles.cardContainer}
          ref={(card) => (this.card = card)}
        >
          <TouchableHighlight
            style={styles.card}
            onPress={() => this.card.flipHorizontal()}
          >
            <Image
              style={styles.cardImage}
              source={require("../../assets/lotr.jpg")}
            />
          </TouchableHighlight>
          <Pressable
            style={styles.card}
            onPress={() => this.card.flipHorizontal()}
          >
            <Image
              style={styles.profilePhoto}
              source={require("../../assets/profilePhoto.jpg")}
            />
            <Text>Film: {this.props.filmName}</Text>
            <Text>Owner: {this.props.ownerName} </Text>
            <TouchableOpacity
              onPress={() => {
                const appeal = [
                  {
                    filmName: this.props.filmName,
                    ownerName: this.props.ownerName,
                  },
                ];
                alert("Your appeal has been sent to the owner");
              }}
              style={[styles.button]}
            >
              <Text style={styles.button}>Join</Text>
            </TouchableOpacity>
          </Pressable>
        </FlipCard>
        <SafeAreaView
          style={styles.footer}
          ref={(footer) => (this.footer = footer)}
        >
          <SafeAreaView style={{ alignItems: "flex-end" }}>
            <Text style={{ marginLeft: 20 }}>{this.props.filmName}</Text>
            <Text>{this.props.ownerName}</Text>
          </SafeAreaView>
          <Image
            source={require("../../assets/profilePhoto.jpg")}
            style={styles.profilePhotoFooter}
          />
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    marginTop: 30,
    margin: 10,
  },
  cardContainer: {
    width: "100%",
    height: 500,
  },
  card: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#ffaeae",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  label: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  manualTriggers: {
    flexDirection: "row",
  },
  trigger: {
    backgroundColor: "black",
    margin: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: "#ffaeae",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    justifyContent: "center",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 20,
  },
  footer: {
    bottom: 0,
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#fff",
    flexDirection: "row",
  },
  profilePhotoFooter: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 10,
  },
});
