import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { Button, Chip, TextInput, FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
const { width, height } = Dimensions.get("window");

const ModalChipsScreen = ({ route: { params } }) => {
  const navigation = useNavigation();
  // console.log(params);
  const interests = params.interests;
  const setInterests = params.setInterests;
  const [interest, setInterest] = useState([]);
  return (
    <View>
      <TextInput
        label="Add Interest"
        style={styles.input}
        mode="outlined"
        onChangeText={(text) => {
          setInterest(text);
        }}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => {
          if (interests) {
            if (interests.includes(interest)) {
              alert("Interest already added");
            } else {
              setInterests((oldArray) => [...oldArray, interest]);
            }
          } else {
            setInterests((oldArray) => [...oldArray, interest]);
          }
          navigation.goBack();
        }}
      />
    </View>
  );
};
export default ModalChipsScreen;

const styles = StyleSheet.create({
  input: {
    margin: 10,
    marginBottom: 0,
    backgroundColor: "#fff",
    color: "#fff",
  },
  button: {
    margin: 10,
    marginBottom: 0,
  },
  fab: {
    position: "absolute",
    margin: 16,
    left: width * 0.42,
    top: height * 0.14,
    backgroundColor: "#6200ed",
    shadowColor: "#6200ed",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.35,
    shadowRadius: 20,
  },
});
