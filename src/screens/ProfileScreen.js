import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-navigation";

const ProfileScreen = () => {
  return (
    <SafeAreaView  forceInset={{ top: "always" }}>
      <Text style={{fontSize:50}}>ProfileScreen</Text>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
