import { StyleSheet, View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect } from "react";
import useResults from "../hooks/useResults";
import { getAdvertWithFilmID } from "../hooks/wlobbyGetters";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "../Components/LoadingIndicatior";
import FlipcardComponent from "../Components/FlipcardComponent";
import { useNavigation } from "@react-navigation/native";
const AdvertListScreen = ({ route: { params } }) => {
  const movieId = params.movieId;
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

  const [getAdvertsWithFilmID, advert, errorMessageAdvert] =
    getAdvertWithFilmID();

  const uri =
    "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + movieInfo.poster_path;

  const navigation = useNavigation();

  useEffect(() => {
    getMovieDetails(movieId);
    getAdvertsWithFilmID(movieId);
  }, [movieId]);
  // console.log("advert", advert);
  // console.log("movie info", movieInfo);
  return (
    <SafeAreaView style={styles.container}>
      {Object.keys(advert).length !== 0 ? (
        <FlatList
          data={advert}
          keyExtractor={(item) => item.AdvertID}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <FlipcardComponent
                style={{ height: "100%", width: "100%" }}
                filmName={isLoading ? "" : movieInfo.original_title}
                userID={item.OwnerID}
                ownerName={"ozan"}
                filmImage={uri}
                isDetailScreen={false}
                comments={"Çok iyi film olcak hacı gel kesin"}
                navigation={navigation}
              />
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LoadingIndicator size={100} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AdvertListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
