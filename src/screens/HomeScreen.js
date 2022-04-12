import {FlatList, SafeAreaView, StatusBar, StyleSheet,} from "react-native";
import React, {useEffect} from "react";
import AutomaticFlipCard from "../Components/AutomaticFlipCard";
import {FAB} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {getAdverts} from "../hooks/wlobbyGetters";
import LoadingIndicatior from "../Components/LoadingIndicatior";

const HomeScreen = () => {
  const data = [
    {
      filmName: "Lord Of The Rings",
      ownerName: "John",
    },
    {
      filmName: "Harry Potter",
      ownerName: "Mike",
    },
    {
      filmName: "Star Wars",
      ownerName: "Sara",
    },
  ];

  const [getAdvertsData, adverts, errorMessage, loading] = getAdverts();

  const [films, setFilms] = React.useState([]);

  useEffect(() => {
    getAdvertsData();
  }, []);

  // useEffect(() => {
  //   if (Object.keys(adverts).length !== 0) {
  //     adverts.map((advert) => {
  //       console.log("advertFIlm", advert.FilmID);
  //       // getMovieDetails(advert.FilmID).then((res) => {
  //       //   console.log("res", res.FilmID);
  //       //   setFilms((prevState) => [...prevState, res]);
  //       // });
  //       const [filmDetails, filmErrorMes, isFilmLoading] = getFilmDetails(
  //         advert.FilmID
  //       );
  //       console.log("filmDetails", filmDetails);

  //       // const fetchData = async () => {
  //       //   const f = await getMovieDetails(advert.FilmID);
  //       //   console.log("f", f);
  //       //   setFilms((prevState) => [...prevState, movieInfo]);
  //       // };
  //       // if (Object.keys(movieInfo).length !== 0) {
  //       //   setFilms((prevState) => [...prevState, movieInfo]);
  //       // }
  //     });
  //   }
  //   // films.map((film) => {
  //   //   console.log("film", film.id);
  //   // });
  // }, [adverts]);

  let FlatListItemSeparator;
  FlatListItemSeparator = () => {
    return (
      <SafeAreaView
        style={{
          height: 1,
          alignSelf: "center",
          width: "90%",
          backgroundColor: "#6200ed",
        }}
      />
    );
  };

  const navigation = useNavigation();
  // console.log("films", films);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      {loading ? (
        <LoadingIndicatior size={100} />
      ) : (
          <FlatList
              style={{height: "100%", width: "100%"}}
              data={adverts}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.AdvertID}
              renderItem={({item}) => (
                  <AutomaticFlipCard
                      advert={item}
                      navigation={navigation}
                      movieID={item.FilmID}
                  />
              )}
          />
      )}

      {/* TODO: Make status bar changeable in the future */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#61dafb"
        animated={true}
      />
      <FAB
        style={styles.fab}
        medium
        icon="plus"
        onPress={() => navigation.navigate("Set")}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "20%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ed",
  },
});
