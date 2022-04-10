import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import FilmImage from "./FilmImage";

const FilmList = ({ filmList }) => {
  console.log("FilmList", filmList);
  return (
    <View>
      <Text>FilmList</Text>
      <FlatList
        horizontal={true}
        data={filmList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <FilmImage movieId={item} />}
      />
    </View>
  );
};

export default FilmList;

const styles = StyleSheet.create({});
