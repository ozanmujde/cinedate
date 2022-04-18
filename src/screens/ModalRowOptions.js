import {Image, SafeAreaView, StyleSheet} from "react-native";
import React from "react";
import {Button, Card, TextInput} from "react-native-paper";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import {SvgUri} from "react-native-svg";
import {ScrollView} from "moti";

const ModalRowOptions = ({route: {params}}) => {
  const navigation = useNavigation();

  function handleDeleteUser() {
    axios.post('https://wlobby-backend.herokuapp.com/delete/user/?UserID=' + params.userData.UserID)
        .then((response) => {
          // console.log(response.data);
          alert("User deleted successfully");
          navigation.navigate("AdminUsers", {users: params.usersData});
        });
  }

  function handleUpdateUser() {
    // console.log(params.usersData);
    navigation.navigate("AdminProfileSettingsScreen", {user: params.userData, usersData: params.usersData});
  }

  return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: '50%'}}>
          {/* <Image
        source={require("../../assets/Wlobby-logos_transparent.png")}
        style={{
          width: "100%",
          height: "20%",
        }}
      /> */}
          <Image source={require('../../assets/Wlobby-logos_transparent.png')} style={styles.logo}/>
          <Card>
            <Card.Content>
              <SvgUri
                  width="100"
                  height="100"
                  uri={params.userData.ProfilePhoto}
                  style={{
                    alignSelf: "center",
                  }}
              />
              <TextInput
                  label="Name"
                  value={params.userData.Name + " " + params.userData.Surname}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="UserName"
                  value={params.userData.Username}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="Email"
                  value={params.userData.Email}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="Age"
                  value={params.userData.Age.toString()}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="Gender"
                  value={params.userData.Sex}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="Last Login"
                  value={params.userData.LastLogIn}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput

                  label="Login Count"
                  value={params.userData.LogInCount.toString()}
                  disabled={true}
                  style={styles.input}
              />
            </Card.Content>
          </Card>

          <Button style={styles.button} icon="delete-outline" mode="contained"
                  onPress={() => handleDeleteUser()}>
            Delete This User
          </Button>
          <Button style={styles.button} icon="account-convert" mode="contained"
                  onPress={() => handleUpdateUser()}>
            Update This User
          </Button>

        </ScrollView>
      </SafeAreaView>

  );
};

export default ModalRowOptions;

const styles = StyleSheet.create({
  button: {
    alignContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: -10,
  },
  input: {
    backgroundColor: "#fff",
    color: "#fff",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  logo: {
    width: '100%',
    height: '20%',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffc8c8',
  },
});
