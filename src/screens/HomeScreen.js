import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {TouchableOpacity} from "react-native-gesture-handler";
import FlipcardComponent from '../components/FlipcardComponent';

const HomeScreen = () => {
  return (
    <View style ={styles.container} >
      <Text style={{fontSize:50}} >Home Screen</Text>
      <FlipcardComponent name='anan' />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
