import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-navigation";

// import { withNavigation } from "react-navigation";
import ResultsDetail from "./ResultsDetail";

const ResultsList = ({ results, navigation }) => {
  if (!results.length) {
    // there is no result dont show anything
    return null;
  }
  const getHeader = () => {
    return <Text>{"My Title"}</Text>;
  };

  const getFooter = () => {
    return <Text>{"Loading..."}</Text>;
  };
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
                // navigation.navigate("ResultsShow", { id: item.id }); // with that we can pass id information to ResultsShowScreen
              }}
            >
              <ResultsDetail result={item} navigation={navigation} />
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
