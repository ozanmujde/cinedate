import React, { Component, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import FlipCard from "react-native-flip-card-plus";
import {
  Avatar,
  Button,
  Headline,
  Snackbar,
  Subheading,
  Text,
  TextInput,
} from "react-native-paper";
import { normalize } from "react-native-elements";
import {SvgUri} from "react-native-svg";
import axios from "axios";

export default class FlipcardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummy: "",
    };
    this.card = React.createRef();
    this.footer = React.createRef();
    // console.log(this.props.advert);
  }
  componentDidUpdate(props) {
    if (this.card.state.side === 1) {
      this.card.flipHorizontal();
    }
  }
  trunc(text) {
    return text.length > 20 ? `${text.substr(0, 20)}...` : text;
  }
  sendAppeal() {
    axios.post('https://wlobby-backend.herokuapp.com/join/advert/?AdvertID=' + this.props.advert.AdvertID + '&UserID=7')
        .then(function (response) {
          console.log(response.data);
        })
  }
  render() {
    return (
      <SafeAreaView>
        <SafeAreaView
          style={styles.footer}
          ref={(footer) => (this.footer = footer)}
        >
          <SafeAreaView style={{ margin: 10 }}>
            <Subheading>{this.trunc(this.props.filmName)}</Subheading>
          </SafeAreaView>
          <SafeAreaView
            style={{
              flexDirection: "row",
              marginRight: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Subheading style={{ paddingRight: 20 }} adjustsFontSizeToFit>
              {this.props.advert.OwnerUsername}
            </Subheading>
            <SvgUri
                width="30"
                height="30"
                uri={"https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Blue01&clotheType=ShirtScoopNeck&eyeType=Surprised&eyebrowType=RaisedExcited&facialHairColor=Brown&facialHairType=MoustacheMagnum&hairColor=Platinum&hatColor=Blue03&mouthType=Grimace&skinColor=Black&topType=LongHairFroBand"}
                style={{
                  alignSelf: "center",
                }}
            />
          </SafeAreaView>
        </SafeAreaView>
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
                source={
                  this.props.filmImage
                    ? {
                        uri: this.props.filmImage,
                      }
                    : require("../../assets/lotr.jpg")
                }
              />
            </TouchableHighlight>
            <Pressable
              style={styles.card}
              onPress={() => this.card.flipHorizontal()}
            >
              <ScrollView style={styles.backendContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Profile", {
                      userID: this.props.advert.OwnerID,
                    })
                  }
                >
                  <SvgUri
                      width="50"
                      height="50"
                      uri={"https://avataaars.io/?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Blue01&clotheType=ShirtScoopNeck&eyeType=Surprised&eyebrowType=RaisedExcited&facialHairColor=Brown&facialHairType=MoustacheMagnum&hairColor=Platinum&hatColor=Blue03&mouthType=Grimace&skinColor=Black&topType=LongHairFroBand"}
                      style={{
                        alignSelf: "center",
                      }}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.textInput}
                  adjustsFontSizeToFit
                  disabled={true}
                  label={"Film"}
                  multiline={true}
                  value={this.props.filmName}
                />
                <TextInput
                  style={styles.textInput}
                  disabled={true}
                  label="Owner"
                  multiline={true}
                  value={this.props.advert.OwnerUsername}
                />
                <TextInput
                  style={styles.textInput}
                  disabled={true}
                  multiline={true}
                  label={"Comments"}
                  value={this.props.advert.Description}
                />
                <TextInput
                    style={styles.textInput}
                    disabled={true}
                    label={"Attendees"}
                    value={Object.values(this.props.advert.AttendeeIDs).join("\n")}
                />
                <TextInput
                  style={styles.textInput}
                  disabled={true}
                  label={"Date"}
                  value={this.props.date}
                />
                <TextInput
                  style={styles.textInput}
                  disabled={true}
                  label={"Time"}
                  value={
                    this.props.time
                  }
                />
                {/* TODO: AUTH geldiginde burayi static kontrol yerine auth userID si ile kontrol et */}
                <Button
                  style={styles.button}
                  icon="account-plus"
                  mode="contained"
                  disabled={this.props.isMyAdvert !== 0 ? Object.keys(this.props.advert.AttendeeIDs).includes("7") : false}
                  onPress={() => {
                    if (this.props.advert.OwnerID !== 7) {
                      const appeal = [
                        {
                          filmName: this.props.filmName,
                          ownerName: this.props.advert.OwnerUsername,
                        },
                      ];
                      this.sendAppeal()
                      alert("Your appeal has been sent to the owner");
                    } else {
                      console.log("film name: " + this.props.filmName);
                      this.props.navigation.navigate("UpdateAdvertScreen", {movieName: this.props.filmName, advert: this.props.advert, date: this.props.date, time: this.props.time});
                    }
                  }}
                >
                  {this.props.advert.OwnerID === 7 ? (
                    "Update The Advert"
                  ) : (
                    <>
                      {this.props.isDetailScreen
                        ? "Your appeal has been sent to the owner"
                        : "Send appeal"}
                    </>
                  )}
                </Button>
              </ScrollView>
            </Pressable>
          </FlipCard>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    margin: 10,
    marginTop: 0,
  },
  cardContainer: {
    width: "100%",
    height: 600,
  },
  card: {
    width: "100%",
    height: "100%",
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
    backgroundColor: "#6200ed",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
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
    marginTop: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
  },
  footer: {
    bottom: 0,
    width: "95%",
    marginBottom: 0,
    // backgroundColor: "#fff",
    // borderTopWidth: 1,
    // borderTopColor: "#ffaeae",
    // borderLeftColor: "#ffaeae",
    // borderLeftWidth: 1,
    // borderRightColor: "#ffaeae",
    // borderRightWidth: 1,
    backgroundColor: "rgba(255,255,255,0.8)",
    // backgroundColor: "white",
    borderRadius: 12,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  profilePhotoFooter: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 10,
  },
  textInput: {
    marginVertical: 10,
    borderRadius: 15,
    marginHorizontal: 50,
  },
  backendContainer: {
    flex: 1,
    width: "70%",
    height: "100%",
    alignSelf: "center",
    marginTop: 10,
  },
});
