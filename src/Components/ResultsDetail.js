import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ResultDetail = ({ result }) => {
  // can be props ll be used like props.result
  const uri =
    "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + result.poster_path;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        // source={result.poster_path ? { uri: uri } : null}
        source={{ uri: uri }}
      />
      <Text style={styles.name}>{result.original_title}</Text>
      <Text>
        {" "}
        {result.vote_average} Average Rating, {result.review_count} Reviews{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    // you have to predefine with and height for image to be displayed
    width: 185,
    height: 278,
    borderRadius: 4, // make borders rounded
    marginBottom: 5,
    //marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    marginLeft: 15,
  },
});

export default ResultDetail;
