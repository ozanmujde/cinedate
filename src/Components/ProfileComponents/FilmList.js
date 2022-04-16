import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import FilmImage from "./FilmImage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";

const FilmList = ({ filmList, button, isWatched, userData }) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        // flexWrap: "wrap",
        flexGrow: 0,
      }}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={filmList}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          return (
            <>
              {button && userData.UserID === 7 ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AdvertListScreen", {
                      movieId: item,
                    });
                  }}
                  onLongPress={() => {
                    navigation.navigate("ModalRemoveFilmScreen", {
                      movieId: item,
                      filmList,
                      isWatched,
                      userData,
                    });
                  }}
                >
                  <FilmImage movieId={item} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AdvertListScreen", {
                      movieId: item,
                    });
                  }}
                >
                  <FilmImage movieId={item} />
                </TouchableOpacity>
              )}
            </>
          );
        }}
      />

      {button && userData.UserID === 7 ? (
        <View style={{ flexGrow: 100 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ModalLikedScreen", {
                filmList,
                isWatched,
                userData,
              });
            }}
          >
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="black"
              // style={{ flex: 1 }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default FilmList;

const styles = StyleSheet.create({});
