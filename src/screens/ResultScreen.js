import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import tmdb from "../api/tmdb";
import FlipcardComponent from "../Components/FlipcardComponent";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import AutomaticFlipCard from "../Components/AutomaticFlipCard";
import useResults from "../hooks/useResults";

const ResultScreen = ({ route: { params } }) => {
  const [result, setResult] = useState(null);
  const { id, isDetailScreen, filmID, advert, isMyAdvert } = params;
  //   const id = navigation.getParam("id"); // this is how we get id from navigation
  //const getResult = useSelector((state) => state.results.result);

  const getResult = async (id) => {
    const response = await tmdb.get(`/movie/${id}`);
    setResult(response.data);
  };
  const navigation = useNavigation();

  useEffect(() => {
    getResult(id);
  }, [params]);

  const [
    searchMovieApi,
    errorMessage,
    results,
    getMovieDetails,
    movieInfo,
    isLoading,
  ] = useResults();

  useEffect(() => {
    getMovieDetails(params.advert);
  }, [params]);


  if (!result) {
    // guarantee u have some result
    return null; // if result is null then return null
  }
  const uri =
    "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + result.poster_path;
  return (
    // <SafeAreaView style={styles.container}>
    <ScrollView style={styles.container}>
      <AutomaticFlipCard
          advert={params.advert}
          navigation={navigation}
          movieID={params.filmID}
          isDetailScreen={params.isDetailScreen}
          isMyAdvert={params.isMyAdvert}
      />
    </ScrollView>
    // </SafeAreaView>
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
    width: "100%",
    height: "100%",
    marginTop: 20,
  },
});

export default ResultScreen;
