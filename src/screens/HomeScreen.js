import { StyleSheet, Text, StatusBar } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import FlipcardComponent from "../components/FlipcardComponent";
import { SafeAreaView } from "react-navigation";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      {/* TODO: Make status bar changeable in the future */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#61dafb"
        animated={true}
      />
      <Text style={{ fontSize: 50 }}>Home Screen</Text>
      <FlipcardComponent name="anan" />
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
});
