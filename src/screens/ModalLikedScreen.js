import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { LogBox } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../Components/SearchBar";
import SearchList from "../Components/SearchList";
import useResults from "../hooks/useResults";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const { width, height } = Dimensions.get("window");

const ModalLikedScreen = ({ route: { params } }) => {
  const navigation = useNavigation();
  const filmList = params.filmList;
  const isWatched = params.isWatched;
  const userData = params.userData;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMovieApi, errorMessage, results] = useResults();
  return (
    <>
      <SearchBar
        term={searchTerm}
        onTermChange={setSearchTerm} // same as above
        onTermSubmit={() => searchMovieApi(searchTerm)}
      />
      <SearchList
        results={results}
        filmList={filmList}
        isWatched={isWatched}
        userData={userData}
      />
    </>
  );
};

export default ModalLikedScreen;

const styles = StyleSheet.create({});
