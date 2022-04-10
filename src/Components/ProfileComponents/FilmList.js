import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import FilmImage from "./FilmImage";

const FilmList = ({ filmList }) => {
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
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
