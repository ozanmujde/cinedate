import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-navigation";



function InboxScreen() {
  return (
      <SafeAreaView>
        <Image source={require('../../assets/wlobby.png')} style={styles.logo} />
      </SafeAreaView>
  );
};

export default InboxScreen;


const styles = StyleSheet.create({});
