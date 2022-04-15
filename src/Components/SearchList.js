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
import { Divider } from "react-native-elements";
import AdvertListScreen from "../screens/AdvertListScreen";

const ITEM_SIZE = 100 + 20 * 3;

const SearchList = ({ results, films, setFilms, isWatched }) => {
  if (!results.length) {
    // there is no result dont show anything
    return null;
  }
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
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
              onPress={() => { //TODO: user update gelince degistir
                // console.log(item);
                if (films.includes(item.id)) {
                  alert("You already liked this movie");
                } else {
                  setFilms((oldArray) => [...oldArray, item.id]);
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
