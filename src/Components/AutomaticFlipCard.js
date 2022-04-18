import { View, Text } from "react-native";
import React, { useEffect, useContext } from "react";
import FlipcardComponent from "./FlipcardComponent";
import useResults from "../hooks/useResults";
import {Time} from "react-native-gifted-chat";
import { Context as AuthContext } from "../context/AuthContext";
const AutomaticFlipCard = ({ advert, navigation, movieID, isDetailScreen, isMyAdvert }) => {
  const { state } = useContext(AuthContext);
  useEffect(() => {
    getMovieDetails(movieID);
    console.log("movieID", movieID);
    console.log("movieInfo", movieInfo);
  }, [movieID]);
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

  if(isDetailScreen !== true) {
    isDetailScreen = false;
  }
  console.log("movieID", movieID);

  let date = advert.Date.split(" ")[0];
  var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
  date = new Date(date.replace(pattern,'$3-$2-$1'));

  let time = advert.Date.split(" ")[1];
  time = new Time(time).props;

  // console.log('advert',advert);
  const uri =
    "https://image.tmdb.org/t/p/w342" + movieInfo.poster_path;
    console.log('uri',uri);
  return (
    // <View style={{ flex: 1, backgroundColor:"red" }}>
      <FlipcardComponent
        style={{ height: "100%", width: "100%" }}
        filmName={isLoading ? "" : movieInfo.original_title}
        advert={advert}
        filmImage={uri}
        userID={state.userID}
        isDetailScreen={isDetailScreen}
        navigation={navigation}
        isMyAdvert={isMyAdvert}
        date={date}
        time={time}
      />
    // </View>
  );
};

export default AutomaticFlipCard;
