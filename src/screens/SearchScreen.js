import { StyleSheet, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import { SafeAreaView } from "react-navigation";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchApi, errorMessage, results] = useResults();

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <SearchBar
        term={searchTerm}
        onTermChange={setSearchTerm} // same as above
        onTermSubmit={() => searchApi(searchTerm)}
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
    fontSize: 20,
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
