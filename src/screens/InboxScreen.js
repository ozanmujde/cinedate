import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from "react-navigation";
import PendingAppealsComponent from "../Components/PendingAppealsComponent";
import Advert from "../classes/Advert";
import FlipcardComponent from "../Components/FlipcardComponent";
import {useNavigation} from "@react-navigation/native";
import useResults from "../hooks/useResults";


function InboxScreen() {
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
        }
    ];
    const [adverts, setAdverts] = React.useState(new Advert(1, 1, "1/1/2022", "1/1/2022", "1/1/2022",
        10, "Both", [1, 2, 3], "active", 1));
    const navigation = useNavigation();
    const [searchMovieApi, errorMessage, results] = useResults();
    const result = [];

    function getFilms() {
        data.map(film => {
            searchMovieApi(film.filmName);
            result.push(results.id);
        });
        return results;
    }

  return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <Image source={require('../../assets/wlobby.png')} style={styles.logo} />
        <FlatList style={{height:'100%', width:'100%', }}
                  data={data}
                  renderItem={({item}) =>
                          <PendingAppealsComponent filmName={item.filmName} ownerName={item.ownerName} navigation={navigation}/>}
                  keyExtractor={(item, index) => index.toString()}></FlatList>
      </SafeAreaView>
      );
};

export default InboxScreen;


const styles = StyleSheet.create({});
