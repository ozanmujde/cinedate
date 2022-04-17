import { View, Text } from "react-native";
import React, { useEffect } from "react";
import FlipcardComponent from "./FlipcardComponent";
import useResults from "../hooks/useResults";
import {Time} from "react-native-gifted-chat";

const AutomaticFlipCard = ({ advert, navigation, movieID, isDetailScreen, isMyAdvert }) => {
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

  let dateString = advert.Date;
  let date = advert.Date.split(" ")[0].split("-").join("/");
  date = new Date(date).toLocaleDateString("en-GB");
  let time = advert.Date.split(" ")[1].split(":")[0] + ":" + advert.Date.split(" ")[1].split(":")[1];
  time = new Time(time).props;

  useEffect(() => {
    getMovieDetails(movieID);
  }, [movieID]);
  // console.log('advert',advert);
  const uri =
    "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + movieInfo.poster_path;
    // console.log("movieInfo", movieInfo);
  return (
    // <View style={{ flex: 1, backgroundColor:"red" }}>
      <FlipcardComponent
        style={{ height: "100%", width: "100%" }}
        filmName={isLoading ? "" : movieInfo.original_title}
        advert={advert}
        filmImage={uri}
        isDetailScreen={isDetailScreen}
        comments={"Çok iyi film olcak hacı gel kesin"}
        navigation={navigation}
        isMyAdvert={isMyAdvert}
        date={date}
        time={time}
      />
    // </View>
  );
};

export default AutomaticFlipCard;
