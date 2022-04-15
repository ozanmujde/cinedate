import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import useResults from "../../hooks/useResults";
const FilmImage = ({ movieId }) => {
  const [
    searchMovieApi,
    errorMessage,
    results,
    getMovieDetails,
    getMoviesDetails,
    movieInfo,
    moviesInfos,
    isLoading,
  ] = useResults();
  useEffect(() => {
    getMovieDetails(movieId);
  }, [movieId]);
  const uri = "https://image.tmdb.org/t/p/h100/" + movieInfo.poster_path;
  return (
    <View>
      <Image style={styles.image} source={{ uri: uri }} />
    </View>
  );
};

export default FilmImage;

const styles = StyleSheet.create({
  image: {
    width: 67,
    height: 100,
    borderRadius: 4, // make borders rounded
    marginHorizontal: 5,
  },
});
