import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-navigation";

import { useNavigation } from "@react-navigation/native";
import ResultsDetail from "./ResultsDetail";
import { Divider } from "react-native-elements";
import AdvertListScreen from "../screens/AdvertListScreen";
const ResultsList = ({ results }) => {
  if (!results.length) {
    // there is no result dont show anything
    return null;
  }
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={results}
        keyExtractor={(result) => result.id} // for performance id is a nice key given by yelp
        renderItem={({ item }) => {
          // item is object we are iterating in FlatList
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AdvertListScreen", {
                  movieId: item.id,
                }); // with that we can pass id information to ResultsShowScreen
              }}
            >
              <ResultsDetail result={item} navigation={navigation} />
              <Divider inset={true} insetType="left" />
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
  },
});

// export default withNavigation(ResultsList);
export default ResultsList;
