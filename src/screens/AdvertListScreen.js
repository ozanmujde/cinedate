import { StyleSheet, View, Text } from "react-native";
import React, { useEffect } from "react";
import useResults from "../hooks/useResults";
const AdvertListScreen = ({ route: { params } }) => {
  const movieId = params.movieId;
  const [searchMovieApi, errorMessage, results, getMovieDetails, movieInfo] =
    useResults();
  useEffect(() => {
    getMovieDetails(movieId);
  }, [movieId]);
  console.log(movieInfo);
  return (
    <View>
      <Text>{movieId}</Text>
    </View>
  );
};

export default AdvertListScreen;

const styles = StyleSheet.create({});
