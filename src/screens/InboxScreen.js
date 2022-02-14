import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-navigation";
const InboxScreen = () => {
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text style={{fontSize:50}}>InboxScreen</Text>
    </SafeAreaView>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({});
