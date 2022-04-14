import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Icon } from "react-native-elements";
import Rating from "./SearchComponents/Rating";
import Genres from "./SearchComponents/Genres";
import genres from "../../assets/genres";
const ResultDetail = ({ result }) => {
  // can be props ll be used like props.result
  const uri = "https://image.tmdb.org/t/p/h100/" + result.poster_path;
  // "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + result.poster_path;
  const movie = {
    title: result.original_title,
    rating: result.vote_average,
    description: result.overview,
    releaseDate: result.release_date,
    genres: result.genre_ids.map((genre) => genres[genre]),
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: uri }}
        // resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Rating rating={movie.rating} />
        <Genres genres={movie.genres} />
        <Text style={styles.subText}>{result.release_date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    // you have to predefine with and height for image to be displayed
    // width: 185,
    // height: 278,
    // flex: 1,
    width: 67,
    height: 100,
    borderRadius: 4, // make borders rounded
    marginBottom: 5,
    //marginRight: 10,
  },
  title: {
    fontSize: 15,
    // fontWeight: "bold",
    marginBottom: 5,
    marginHorizontal: 4,
  },
  subText: {
    fontSize: 12,
    marginBottom: 5,
    marginHorizontal: 4,
    color: "#808080",
  },

  container: {
    flexDirection: "row",
    // marginLeft: 5,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    // backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
});

export default ResultDetail;
