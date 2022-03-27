import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import React from "react";
import FlipcardComponent from "../Components/FlipcardComponent";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

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
      <Image source={require("../../assets/wlobby.png")} style={styles.logo} />
      <FlatList
        style={{ height: "100%", width: "100%" }}
        data={data}
        renderItem={({ item }) => (
          <FlipcardComponent
            ownerName={item.ownerName}
            filmName={item.filmName}
            userID={10}
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
