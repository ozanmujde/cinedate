import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, Image, FlatList } from "react-native";
import tmdb from "../api/tmdb";
import FlipcardComponent from "../Components/FlipcardComponent";

const ResultScreen = ({ route: { params } }) => {
  const [result, setResult] = useState(null);
  const { id } = params;
  //   const id = navigation.getParam("id"); // this is how we get id from navigation
  //const getResult = useSelector((state) => state.results.result);

  const getResult = async (id) => {
    const response = await tmdb.get(`/movie/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, [params]);

  if (!result) {
    // guarantee u have some result
    return null; // if result is null then return null
  }
  const uri =
    "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + result.poster_path;
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <FlipcardComponent
        filmName={result.original_title}
        ownerName={"ozanin Kodu"}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 300,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default ResultScreen;
