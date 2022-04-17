import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import LoginScreen from "react-native-login-screen";
import { Context as AuthContext } from "../context/AuthContext";
import { Card } from "react-native-paper";
import {SocialIcon} from "react-native-elements";


const Login = ({ navigation }) => {

  const { signIn } = useContext(AuthContext);
  let {email} = "";
  let {password} = "";
  function onChangeEmail(text) {
    email = text;
  }

  function onChangePassword(text) {
    password = text;
  }

  return (
      <ScrollView
          style={styles.ScrollViewContainer}
          showsVerticalScrollIndicator={false}
      >
        <LoginScreen
            logoImageSource={require("../../assets/Wlobby-logos_transparent.png")}
            logoImageStyle={{ width: 300, height: 300, marginBottom: -80 }}
            loginButtonStyle={{ backgroundColor: "#6200ed" }}

            onEmailChange={(text) => {
              onChangeEmail(text);
            }}
            onPasswordChange={(text) => {
              onChangePassword(text);
            }}

            onLoginPress={() => {
              signIn({email, password});
            }}
            onHaveAccountPress={() => {
              navigation.navigate("Signup");
            }}
            haveAccountText={"Don't have an accont? Sign Up."}
            disableSocialButtons={true}
        />

        <SocialIcon
            title='Log in as Admin'
            button
            type='google'
            onPress={() => {
              navigation.navigate("AdminPanel");
            }}
        />

      </ScrollView>


  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    height: "100%",
    width: "80%",
  },
  inputContainer: {
    width: "80%",
    //maxWidth: 300,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
    height: 50,
    fontSize: 16,
    width: "100%",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  button: {
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "#fff",
    marginTop: 10,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "bold",
    fontSize: 16,
  },
  logo: {
    width: "100%",
  },
  ScrollViewContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
