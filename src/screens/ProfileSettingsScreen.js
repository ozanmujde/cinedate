import { StyleSheet, Text, View, TextInput,ScrollView } from "react-native";

import React, { useState } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Input } from "react-native-elements";
//TODO: Authentication la beraber burasi degismeli
const ProfileSettingsScreen = ({ route: { params } }) => {
  const userData = params.userData;
  const navigation = useNavigation();
  const [name, setName] = useState(userData.Name);
  const [surname, setSurname] = useState(userData.Surname);
  const [email, setEmail] = useState(userData.Email);
  const [age, setAge] = useState(userData.Age);
  const [about, setAbout] = useState(userData.About);
  const [bio, setBio] = useState(userData.Bio);
  console.log(typeof age);


  const updateNewUser = () => { // TODO: Backend degisince buraya bak
    console.log(name, surname, email, age, about, bio);
  };
  //   console.log("userData", userData);
  return (
    <ScrollView>
      <Input
        label="Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <Input
        label="Surname"
        value={surname}
        onChangeText={(text) => {
          setSurname(text);
        }}
      />
      <Input
        label="Age"
        value={age.toString()}
        onChangeText={(text) => {
          //   setAge(Number(text));
          setAge(text);
        }}
      />
      <Input
        label="BIO"
        value={bio}
        onChangeText={(text) => {
          setBio(text);
        }}
        multiline={true}
      />
      <Input
        label="About"
        value={about}
        onChangeText={(text) => {
          setBio(text);
        }}
        multiline={true}
      />

      <Button
        style={styles.button}
        icon="account-check"
        mode="contained"
        onPress={() => {
          navigation.goBack();
        }}
      >
        Save
      </Button>
    </ScrollView>
  );
};

export default ProfileSettingsScreen;

const styles = StyleSheet.create({});
