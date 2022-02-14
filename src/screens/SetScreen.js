import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-navigation";

const SetScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{fontSize:50}}>SetScreen</Text>
    </SafeAreaView>
  );
};

export default SetScreen;

const styles = StyleSheet.create({});
