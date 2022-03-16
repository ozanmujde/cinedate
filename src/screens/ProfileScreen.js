import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React, {useContext} from 'react';
import {Button} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {Context as AuthContext} from "../context/AuthContext";

const ProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const {name,surname} = route.params ? route.params : {} ;
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView  forceInset={{ top: "always" }} >
      <Text style={{fontSize:50}}>ProfileScreen</Text>
      <Text>{name ? name : "admin"}</Text>
      <Text>{surname ? surname: "admin"}</Text>
      <Button style={styles.button} icon="logout" mode="contained" onPress={() => signout()}>
        Sign Out
      </Button>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
