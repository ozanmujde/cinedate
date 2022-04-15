import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { getAdvertWithAdvertID } from "../../hooks/wlobbyGetters";
import FilmImage from "./FilmImage";
import { useNavigation } from "@react-navigation/native";
const AutomaticFilmImage = ({ advertId }) => {
  const [getAdvert, advert, errorMessage] = getAdvertWithAdvertID(advertId);
  const uri = "https://image.tmdb.org/t/p/h100/" + advert.poster_path;
  const navigation = useNavigation();
  useEffect(() => {
    getAdvert(advertId);
  }, [advertId]);
  return (
    <TouchableOpacity
      //   style={{
      //     // height: "100%",
      //     // width: "100%",
      //     backgroundColor: "white",
      //     borderRadius: 10,
      //     shadowColor: "#000",
      //     shadowOffset: {
      //       width: 0,
      //       height: 2,
      //     },
      //     shadowOpacity: 0.25,
      //     shadowRadius: 3.84,
      //     elevation: 5,
      //   }}
      onPress={() => {
        navigation.navigate("AdvertListScreen", {
          movieId: advert.FilmID,
        });
      }}
    >
      <FilmImage movieId={advert.FilmID} />
    </TouchableOpacity>
  );
};

export default AutomaticFilmImage;

const styles = StyleSheet.create({});
