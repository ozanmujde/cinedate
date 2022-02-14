import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ResultDetail = ({ result }) => {
  // can be props ll be used like props.result
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={result.image_url ? { uri: result.image_url } : null}
      />
      <Text style={styles.name}>{result.name}</Text>
      <Text>
        {" "}
        {result.rating} Stars, {result.review_count} Reviews{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    // you have to predefine with and height for image to be displayed
    width: 250,
    height: 120,
    borderRadius: 4, // make borders rounded
    marginBottom: 5,
    //marginRight: 10,
  },
  name: {
    //fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    marginLeft: 15,
  },
});

export default ResultDetail;
