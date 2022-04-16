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
import axios from "axios";
const { width, height } = Dimensions.get("window");

const ModalRemoveFilmScreen = ({ route: { params } }) => {
  const movieId = params.movieId;
  const filmList = params.filmList;
  const isWatched = params.isWatched;
  const userData = params.userData;

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

  const updateNewUser = (item) => {
    let newData = userData;
    if (isWatched) {
      // console.log(item);
      // console.log(userData.WatchedFilms.filter((id) => id !== item));
      newData = {
        ...userData,
        WatchedFilms: userData.WatchedFilms.filter((id) => id !== item),
      };
    } else {
      newData = {
        ...userData,
        LikedFilms: userData.LikedFilms.filter((id) => id !== item),
      };
    }

    const jsonData = JSON.stringify(newData);
    var config = {
      method: "post",
      url: "https://wlobby-backend.herokuapp.com/update/user/",
      headers: {
        "Content-Type": "application/json",
      },
      data: jsonData,
    };
    console.log(jsonData);
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const uri =
    "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + movieInfo.poster_path;

  const navigation = useNavigation();

  useEffect(() => {
    getMovieDetails(movieId);
    getAdvertsWithFilmID(movieId);
  }, [movieId]);
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
          <>
            <Text style={styles.paragraph}>
              {isWatched
                ? "  Remove this movie  from your Watched List ?"
                : "Remove this movie from your Liked List ?"}
            </Text>
            <FAB
              style={styles.fab}
              medium
              icon="minus"
              onPress={() => {
                // TODO: USERUPDATE gelince burasi da degistirilmeli
                updateNewUser(movieId);
                // const tempFilmlist = filmList.filter((film) => film.id !== movieId);
                // setFilms(films.filter((film) => film !== movieId));

                navigation.goBack();
              }}
            />
          </>
        </>
      )}
    </SafeAreaView>
  );
};
export default ModalRemoveFilmScreen;

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
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
    position: "absolute",
    bottom: height * 0.14,
    // right: width * 0.2,
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
