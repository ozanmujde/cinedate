import { View, Text } from "react-native";
import React, { useEffect } from "react";
import useResults from "../hooks/useResults";
import PendingAppealsComponent from "./PendingAppealsComponent";

const AutomaticPendingAppeals = ({advert, navigation, movieID}) => {

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
    getMovieDetails(movieID);
    console.log("advert: ", advert);
    console.log("movieID: ", movieID);
    console.log("movieInfo: ", movieInfo.original_title);
  }, [movieID]);

  const uri =
      "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + movieInfo.poster_path;

  return (
      <PendingAppealsComponent
          filmName={isLoading ? "Loading..." : movieInfo.original_title}
          ownerName={"omer"}
          navigation={navigation}
          pendingStatus={"Pending"}
          movieID={movieID}
          advert={advert}
      />
  );
}


export default AutomaticPendingAppeals
