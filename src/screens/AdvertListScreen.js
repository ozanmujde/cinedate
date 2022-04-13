import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import useResults from "../hooks/useResults";
import { getAdvertWithFilmID } from "../hooks/wlobbyGetters";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingIndicator from "../Components/LoadingIndicatior";
import FlipcardComponent from "../Components/FlipcardComponent";
import { useNavigation } from "@react-navigation/native";
import Backdrop from "../Components/Backdrop";
import { FAB } from "react-native-paper";
const { width, height } = Dimensions.get("window");

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

  const [getAdvertsWithFilmID, advert, errorMessageAdvert, loading] =
    getAdvertWithFilmID();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text style={styles.headerStyle}>{movieInfo.original_title}</Text>
      ),
    });
  }, [movieInfo]);

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
      <Backdrop path={movieInfo.backdrop_path} />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LoadingIndicator size={100} />
        </View>
      ) : (
        <>
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
            // <View style={{ backgroundColor: "midnightblue", flex:1 }}>
            <>
              <Text style={styles.paragraph}>
                We couldn't find any open advert for this movie
              </Text>
              <FAB
                style={styles.fab}
                medium
                icon="plus"
                onPress={() => navigation.navigate("Set")}
              />
            </>
            // </View>
          )}
        </>
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
  paragraph: {
    margin: 8,
    fontSize: 24,
    // fontWeight: 'bold',
    textAlign: "center",
    // fontFamily: "Menlo",
    color: "midnigtblue",
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    position: "absolute",
    bottom: height * 0.14,
    // right: width * 0.2,
    color: "midnightblue",
  },
  headerStyle: {
    // margin: 12,
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: "center",
    // fontFamily: "Menlo",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: width * 0.38,
    bottom: height * 0.02,

    backgroundColor: "#6200ed",
  },
});
