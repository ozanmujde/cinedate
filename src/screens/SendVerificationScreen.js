import {StyleSheet, Image, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect} from "react";
import {SafeAreaView} from "moti";
import {Button, TextInput} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import { Context as AuthContext } from "../context/AuthContext";
import {Auth} from "aws-amplify";

import axios from "axios";


const SendVerificationScreen = () => {
  const [email, setEmail] = React.useState("");
//  const {confirmEmail} = useContext(AuthContext);
  //const {resendCodeVerification} = useContext(AuthContext);
  const {state} = useContext(AuthContext);
  const [verificationCode, setVerificationCode] = React.useState("");
  const navigation = useNavigation();

  function handleOnPress() {
    const confirmEmail =
        async ({ email, code }) => {

          try {
            const response = await Auth.confirmSignUp(email, code);
            console.log("confirm response", response);
            alert("You have successfully registered!");
            navigation.navigate("Login");
          } catch (err) {
            alert("Can not confirm email, please check the code");

          }
        };

    if(email !== "" && verificationCode !== ""){
      console.log(state.isConfirmed);
      confirmEmail({email:email.toString(), code:verificationCode.toString()})
    }
    else {
      alert("Please fill required areas!");
    }



  }
  function handleOnPressRefresh() {

    const resendCodeVerification =
        async ({ email}) => {
          try {
            const response = await Auth.resendSignUp(email);
            alert("Code send again");
          } catch (err) {
            alert(err);
          }
        };

    if(email !== ""){
      resendCodeVerification({email:email.toString()});
    }
    else {
      alert("Please fill email!");
    }



  }

  return (


      <SafeAreaView style={styles.mainContainer}>
        <Image source={require('../../assets/Wlobby-logos_transparent.png')} style={styles.logo}/>
        <TextInput style={styles.textInput} label="Email" value={email}
                   onChangeText={email => setEmail(email)}/>
        <TextInput style={styles.textInput} label="Verification Code" value={verificationCode}
                   onChangeText={verificationCode => setVerificationCode(verificationCode)}/>
        <Button style={styles.button} icon="check" mode="contained"
                onPress={() => handleOnPress()}>
          Confirm Email
        </Button>
        <Button style={styles.button} icon="check" mode="contained"
                onPress={() => handleOnPressRefresh()}>
          Resend the Code
        </Button>
      </SafeAreaView>
  );
}

export default SendVerificationScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  logo: {
    width: '100%',
    height: '20%',
  },
  textInput: {
    marginTop: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10
  },
});