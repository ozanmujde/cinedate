import {getAdverts, getUsers} from "../hooks/wlobbyGetters";
import React, {useEffect} from "react";
import {Alert, KeyboardAvoidingView, SafeAreaView, StyleSheet} from "react-native";
import {Button, Card, List, TextInput} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

const AdminPanel = () => {

  const navigation = useNavigation();

  const [getUserData, userData, getUsersData, usersData, errorMsg] = getUsers();

  const [adminUsername, setAdminUsername] = React.useState("");
  const [adminPassword, setAdminPassword] = React.useState("");
  const [secureTextEntryForConfirm, setSecureTextEntryForConfirm] = React.useState(true);
  const [showAdminPanel, setShowAdminPanel] = React.useState(false);



  useEffect(async () => {
    getUsersData();
  }, []);

  function handleSubmit() {
    if (adminUsername === "admin" && adminPassword === "admin") {
      setShowAdminPanel(true);
    } else {
      alert("Wrong username or password");
    }
  }

  return (
      <SafeAreaView style={styles.container} forceInset={{top: "always"}}>
        <KeyboardAwareScrollView>
          <Card style={{borderWidth: ".4", margin: 10}}>
            <Card.Content>
              <TextInput style={styles.textInput} label="Username" value={adminUsername}
                         onChangeText={adminUsername => setAdminUsername(adminUsername)}/>
              <TextInput
                  style={styles.textInput}
                  label="Password"
                  secureTextEntry={secureTextEntryForConfirm}
                  value={adminPassword}
                  onChangeText={adminPassword => setAdminPassword(adminPassword)}
                  right={
                    <TextInput.Icon
                        name={secureTextEntryForConfirm ? "eye" : "eye-off"}
                        onPress={() => {
                          setSecureTextEntryForConfirm(!secureTextEntryForConfirm);
                        }}
                    />
                  }
              />
              <Button style={styles.button} icon="check" mode="contained"
                      onPress={() => handleSubmit()}>
                Submit
              </Button>
            </Card.Content>
          </Card>
          {
            showAdminPanel ?
                <Card>
                  <Card.Content>
                    <List.Item
                        title="Users"
                        description="See all users"
                        left={props => <List.Icon {...props} icon="account-group-outline"/>}
                        onPress={() => navigation.navigate("AdminUsers", {users: usersData})}
                    />
                    <List.Item
                        title="Adverts"
                        description="See all adverts"
                        left={props => <List.Icon {...props} icon="book-multiple"/>}
                        onPress={() => navigation.navigate("AdminAdverts", {users: usersData})}
                    />
                  </Card.Content>
                </Card> : null
          }

        </KeyboardAwareScrollView>

      </SafeAreaView>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: "100%",
    height: "10%",
    resizeMode: "contain",
    marginBottom: "5%",
  },
  button: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10
  },
  textInput: {
    marginTop: 10,
    backgroundColor: "#fff",
  },
  buttonDelete: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#ff0000",
  },
});
