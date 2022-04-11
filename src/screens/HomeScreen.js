import {FlatList, SafeAreaView, StatusBar, StyleSheet,} from "react-native";
import React, {useEffect} from "react";
import FlipcardComponent from "../Components/FlipcardComponent";
import {FAB} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
 import {getAdverts} from "../hooks/wlobbyGetters";
import useResults from "../hooks/useResults";

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

  const [getAdvertsData, adverts, errorMessage] = getAdverts();
  const [searchMovieApi, tmdbErrorMessage, results, getMovieDetails, movieInfo] =
      useResults();

  const [films, setFilms] = React.useState([]);
  useEffect(() => {
    getAdvertsData().then(() => {
      console.log("asdsda", adverts);
    });
  }, []);



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

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <FlatList
        style={{ height: "100%", width: "100%" }}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <FlipcardComponent
                ownerName={item.ownerName}
                filmName={item.filmName}
                userID={2}
                isDetailScreen={false}
                comments={"Çok iyi film olcak hacı gel kesin"}
                navigation={navigation}
            />
        )}
        keyExtractor={(item, index) => index.toString()}
      ></FlatList>
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
