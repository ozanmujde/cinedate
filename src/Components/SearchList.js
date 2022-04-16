import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-navigation";

import { useNavigation } from "@react-navigation/native";
import ResultsDetail from "./ResultsDetail";
import axios from "axios";
import { Divider } from "react-native-elements";
import AdvertListScreen from "../screens/AdvertListScreen";

const ITEM_SIZE = 100 + 20 * 3;

const SearchList = ({ results, filmList, isWatched, userData }) => {
  if (!results.length) {
    // there is no result dont show anything
    return null;
  }
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const updateNewUser = (item) => {
    let newData = userData;
    if (isWatched) {
      newData = {
        ...userData,
        WatchedFilms: [...userData.WatchedFilms, item.id],
      };
    } else {
      newData = {
        ...userData,
        LikedFilms: [...userData.LikedFilms, item.id],
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

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        data={results}
        contentContainerStyle={{
          paddingTop: 10,
          backgroundColor: "white",
          paddingBottom: 120,
        }}
        keyExtractor={(result) => result.id} // for performance id is a nice key given by yelp
        renderItem={({ item, index }) => {
          const inputRange = [
            // lose the value when u can see 2 value under
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            // make it go fade out
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
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
            <TouchableOpacity
              onPress={() => {
                //TODO: user update gelince degistir
                // console.log(item);
                if (filmList.includes(item.id)) {
                  if (isWatched) {
                    alert("You already watched this movie");
                  } else {
                    alert("You already liked this movie");
                  }
                } else {
                  updateNewUser(item);
                  // setFilms([...userData.WatchedFilms, item.id]);
                  navigation.goBack();
                }
              }}
            >
              <Animated.View style={{ transform: [{ scale }], opacity }}>
                <ResultsDetail
                  result={item}
                  navigation={navigation}
                  scale={scale}
                />
              </Animated.View>
              {/* <Divider inset={true} insetType="left" /> */}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: "white",
  },
});

// export default withNavigation(ResultsList);
export default SearchList;
