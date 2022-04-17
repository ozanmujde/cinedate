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
  const { signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <ScrollView
      style={styles.ScrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <LoginScreen
        logoImageSource={require("../../assets/Wlobby-logos_transparent.png")}
        logoImageStyle={{ width: 300, height: 300, marginBottom: -80 }}
        loginButtonStyle={{ backgroundColor: "#6200ed" }}
        disableSocialButtons={true}
        onLoginPress={() => {
          signin({ email, password });
        }}
        onHaveAccountPress={() => {
          navigation.navigate("Signup");
        }}
        haveAccountText={"Don't have an accont? Sign Up."}
      />
      <SocialIcon
          style={{marginTop: -10}}
          title='Sign In With Google'
          button
          type='google'
          onPress={() => {
            console.log('Pressed');
          }}
      />
      <SocialIcon
          title='Log in as Admin'
          style={{backgroundColor: 'gray'}}
          button
          type='apple'
          onPress={() => {
            navigation.navigate("AdminPanel");
          }}
      />
      <SocialIcon
          title='Sign In With Github'
          style={{backgroundColor: 'black'}}
          button
          type='github'
          onPress={() => {
            console.log('Pressed');
          }}
      />
      <SocialIcon
          title='Sign In With Facebook'
          button
          type='facebook'
          onPress={() => {
            console.log('Pressed');
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
