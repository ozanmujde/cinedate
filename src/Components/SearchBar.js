import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  // To get information from child to parents we use callback functions
  return (
    <View style={styles.background}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        placeholder="search"
        style={styles.inputStyle}
        value={term}
        // onChangeText={(newTerm) => onTermChange(newTerm)}
        onChangeText={onTermChange} // same as above
        autoCapitalize="none"
        autoCorrect={false}
        // onEndEditing={() => onTermSubmit()}
        onEndEditing={onTermSubmit} // same as above
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    marginTop: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 25,
    alignSelf: "center",
  },
});

export default SearchBar;
