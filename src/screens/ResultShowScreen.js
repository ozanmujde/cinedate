import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, Image, FlatList } from "react-native";
import yelp from "../api/yelp";

const ResultShowScreen = ({ route: { params } }) => {
  const [result, setResult] = useState(null);
  const { id } = params; 
  //   const id = navigation.getParam("id"); // this is how we get id from navigation
  //const getResult = useSelector((state) => state.results.result);

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    // guarantee u have some result
    return null; // if result is null then return null
  }

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
});

export default ResultShowScreen;
