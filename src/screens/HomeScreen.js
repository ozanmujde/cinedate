import {FlatList, Image, StyleSheet, Text, StatusBar} from 'react-native';
import React from 'react';
import {TouchableOpacity} from "react-native-gesture-handler";
import FlipcardComponent from '../Components/FlipcardComponent';
import { SafeAreaView } from "react-navigation";
import tmdb from "../api/tmdb";

const HomeScreen = () => {
  const data = [
    {
      "filmName": "Lord Of The Rings",
      "ownerName": "John",
    },
    {
      "filmName": "Harry Potter",
      "ownerName": "Mike",
    },
    {
      "filmName": "Star Wars",
      "ownerName": "Sara",
    },
  ];
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <Image source={require('../../assets/wlobby.png')} style={styles.logo} />
      <FlatList style={{height:'100%', width:'100%'}}
        data={data}
        renderItem={({item}) => <FlipcardComponent ownerName={item.ownerName} filmName={item.filmName}/>}
        keyExtractor={(item, index) => index.toString()}></FlatList>
      {/* TODO: Make status bar changeable in the future */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#61dafb"
        animated={true}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: '100%',
    height: '20%',
  },
});
