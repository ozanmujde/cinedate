import { View, Text } from "react-native";
import React, { useEffect } from "react";
import FlipcardComponent from "./FlipcardComponent";
import useResults from "../hooks/useResults";

const AutomaticFlipCard = ({ advert, navigation, movieID }) => {
  const [
    searchMovieApi,
    errorMessage,
    results,
    getMovieDetails,
    movieInfo,
    isLoading,
  ] = useResults();

  useEffect(() => {
    getMovieDetails(movieID);
  }, [movieID]);

  const uri =
    "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + movieInfo.poster_path;
  //   console.log("movieInfo", movieInfo);
  return (
    // <View style={{ flex: 1, backgroundColor:"red" }}>
      <FlipcardComponent
        style={{ height: "100%", width: "100%" }}
        filmName={isLoading ? "" : movieInfo.original_title}
        userID={advert.OwnerID}
        ownerName={"ozan"}
        filmImage={uri}
        isDetailScreen={false}
        comments={"Çok iyi film olcak hacı gel kesin"}
        navigation={navigation}
      />
    // </View>
  );
};

export default AutomaticFlipCard;
