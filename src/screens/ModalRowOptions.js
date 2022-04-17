import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ModalRowOptions = ({ route: { params } }) => {
  const { user } = params;
  return (
    <View>
      <Text>{user.Name}</Text>
    </View>
  );
};

export default ModalRowOptions;

const styles = StyleSheet.create({});
