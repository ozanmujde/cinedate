import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import FilmImage from "./FilmImage";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";

const FilmList = ({ filmList, button }) => {
  const navigation = useNavigation();
  const [films, setFilms] = React.useState(filmList);
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
          data={films}
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

        {button ? (
          <View style={{ flexGrow: 100 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ModalLikedScreen", {
                  films,
                  setFilms,
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
