import React, {Component, useState} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable, Image, TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from "react-navigation";
import {useNavigation} from "@react-navigation/native";
import tmdb from "../api/tmdb";

let result;
let uri;
export default class PendingAppealsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }

  function1 = async () => {
    try {
      const response = await tmdb.get("/search/movie", {
        params: {
          query: this.props.filmName,
        },
      });
      // console.log(response.data);
      result = response.data.results[0];
    } catch (err) {
      console.log("Something went wrong");
    }
    uri = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + result.poster_path;
    this.props.navigation.navigate('ResultScreen', {id: result.id, image: uri});
  };

  render() {
    return (
        <TouchableOpacity style={[styles.container,styles.separator]} onPress={() => {
          this.function1();
        }}
        >
          <Text style={styles.text}>{this.props.filmName}</Text>
          <Text style={styles.text}>{this.props.ownerName}</Text>
        </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d9fe0'
  },
  separator: {
    flex: 1,
    borderWidth: 1,
  },
  label: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'System',
    color: '#966464',
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'System',
    color: 'rgba(0,0,255,0.58)',
    backgroundColor: 'transparent',
  },
  logo: {
    width: '100%',
    height: '20%',
  },
});

