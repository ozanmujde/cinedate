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
  console.log("result", result);
  // const movie = result.map(
  //   ({
  //     original_title,
  //     vote_average,
  //     overview,
  //     release_date,
  //     genre_ids,
  //   }) => ({
  //     title: original_title,
  //     rating: vote_average,
  //     description: overview,
  //     releaseDate: release_date,
  //     genres: genre_ids.map((genre) => genres[genre]),
  //   })
  // );
  const movie = {
    title: result.original_title,
    rating: result.vote_average,
    description: result.overview,
    releaseDate: result.release_date,
    genres: result.genre_ids.map((genre) => genres[genre]),
  };
  return (
    <>
      {/* <Card>
        <Card.Title>{result.original_title}</Card.Title>
        <View style={styles.container}>
          <Card.Image
            style={styles.image}
            source={{ uri: uri }}
            resizeMode="cover"
          />
          <View style={styles.textContainer}>
            <Text>Average TMDB Voting : {result.vote_average}</Text>
            <Text>Release Date : {result.release_date}</Text>
          </View>
        </View>
      </Card> */}

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
    </>
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
    // flex: 1,
    flexDirection: "row",
    marginLeft: 5,
    // marginRight: 15,
    // marginTop: 10,
    // marginBottom: 10,
  },
});

export default ResultDetail;
