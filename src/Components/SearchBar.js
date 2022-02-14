import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ term, onTermChange,onTermSubmit }) => {
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
        autoCapitalize='none'
        autoCorrect={false}
        // onEndEditing={() => onTermSubmit()}
        onEndEditing={onTermSubmit} // same as above
      />
     
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    marginTop: 15,
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5, // rounded corners
    marginHorizontal: 15,
    flexDirection: "row",
    marginBottom: 10,
  },
  inputStyle: {
    //   borderColor: 'black',
    //   borderWidth: 1,
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
  },
});

export default SearchBar;
