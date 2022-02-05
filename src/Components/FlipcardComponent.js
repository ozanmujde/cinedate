import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable, Image, TouchableHighlight,
} from 'react-native';
import FlipCard from "react-native-flip-card-plus";

export default class FlipcardComponent extends Component {
  constructor(props) {
    super(props);
    this.card = React.createRef();
  }

  render() {
    return (
        <View style={styles.container}>
            <FlipCard
                flipDirection={"h"}
                style={styles.cardContainer}
                ref={(card) => (this.card = card)}>
              <TouchableHighlight
                  style={styles.card}
                  onPress={() => this.card.flipHorizontal()}>
                <Image style={styles.cardImage} source={require('../../assets/lotr.jpg')} />
              </TouchableHighlight>
              <Pressable style={styles.card}
                         onPress={() => this.card.flipHorizontal()}>
                <Image style={styles.profilePhoto} source={require('../../assets/profilePhoto.jpg')} />
                <Text>Film: Lord Of the Rings</Text>
                <Text>Owner: Omer Faruk Polat </Text>
                <TouchableOpacity
                    onPress={() => {
                      alert("Your appeal has been sent to the owner");
                    }}
                    style={[styles.button]}
                >
                  <Text style={styles.button}>Join</Text>
                </TouchableOpacity>
              </Pressable>
            </FlipCard>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardContainer: {
    width: 220,
    height: 270,
  },
  card: {
    width: 220,
    height: 270,
    alignItems: 'center',
    backgroundColor: '#ffaeae',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  label: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'System',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  manualTriggers: {
    flexDirection: 'row',
  },
  trigger: {
    backgroundColor: 'black',
    margin: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  cardImage : {
    width: 220,
    height: 270,
  },
   profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
   },
  button: {
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 20
  },

});
