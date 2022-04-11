import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import FilmImage from "./FilmImage";
import { useNavigation } from "@react-navigation/native";

const FilmList = ({ filmList }) => {
  const navigation = useNavigation();
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={filmList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("AdvertListScreen", {
                  movieId: item,
                });
              }}
            >
              <FilmImage movieId={item} />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default FilmList;

const styles = StyleSheet.create({});
