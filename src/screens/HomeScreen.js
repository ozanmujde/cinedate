import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import AutomaticFlipCard from "../Components/AutomaticFlipCard";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getAdverts } from "../hooks/wlobbyGetters";
import LoadingIndicatior from "../Components/LoadingIndicatior";
import ChatHeader from "../Components/ChatComponents/ChatHeader";
import { Image, View } from "moti";
const ITEM_SIZE = 280 + 20 * 3;

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
  const scrollY = useRef(new Animated.Value(0)).current;
  const [films, setFilms] = React.useState([]);

  useEffect(() => {
    getAdvertsData();
    navigation.setOptions({
      headerTitle: () => <ChatHeader userId={2} />,
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
  // console.log("films", films);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      {loading ? (
        <LoadingIndicatior size={100} />
      ) : (
        <View style={{ height: "100%", width: "100%" }}>
          <Image
            source={require("../../assets/Wlobby-logos_transparent.png")}
            style={styles.logo}
          />

          <Animated.FlatList
            style={{ height: "100%", width: "100%" }}
            data={adverts}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.AdvertID}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            renderItem={({ item, index }) => {
              const inputRange = [
                // lose the value when u can see 2 value under
                -1,
                0,
                700 * index,
                700 * (index + 1),
              ];

              const opacityInputRange = [
                // lose the value when u can see 2 value under
                -1,
                0,
                600 * index,
                600 * (index + 1),
              ];
              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const opacity = scrollY.interpolate({
                inputRange: opacityInputRange,
                outputRange: [1, 1, 1, 0],
              });
              return (
                <Animated.View
                  style={{
                    transform: [{ scale }],
                    // opacity,
                  }}
                >
                  <AutomaticFlipCard
                    advert={item}
                    navigation={navigation}
                    movieID={item.FilmID}
                  />
                </Animated.View>
              );
            }}
          />
        </View>
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
        onPress={() => navigation.navigate("Set", { movieName: "" })}
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
    height: "10%",
    resizeMode: "contain",
    marginBottom: "5%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ed",
    // shadowColor: "#6200ed",
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.35,
    // shadowRadius: 20,
  },
});
