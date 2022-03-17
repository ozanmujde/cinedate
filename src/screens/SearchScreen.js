import { StyleSheet, Text, ScrollView, SafeAreaView } from "react-native";
// import { SearchBar } from "react-native-elements";
import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../Components/ResultsList";
const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMovieApi, errorMessage, results] = useResults();

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      {/* <SearchBar
        round
        placeholder="Search for a movie..."
        onChangeText={setSearchTerm}
        value={searchTerm}
        onEndEditing={() => searchMovieApi(searchTerm)}
        platform={'default'}
        containerStyle={{
          backgroundColor: "#fff",
          borderColor: "#fff",
        }}
        inputStyle={{
          backgroundColor: "#e6e6e6",
        }}
        inputContainerStyle={{
          backgroundColor: "#e6e6e6",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "black",
        }}

      /> */}

      <SearchBar
        term={searchTerm}
        onTermChange={setSearchTerm} // same as above
        onTermSubmit={() => searchMovieApi(searchTerm)}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <ResultsList results={results} />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
