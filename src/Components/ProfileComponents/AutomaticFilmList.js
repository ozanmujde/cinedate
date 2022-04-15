import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import AutomaticFilmImage from "./AutomaticFilmImage";
const AutomaticFilmList = ({ advertList }) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      data={advertList}
      keyExtractor={(item) => item}
      renderItem={({ item }) => {
        return <AutomaticFilmImage advertId={item} />;
      }}
    />
  );
};

export default AutomaticFilmList;

const styles = StyleSheet.create({});
