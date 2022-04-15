import {StyleSheet, Image, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import {SafeAreaView} from "moti";
import {Button, TextInput} from "react-native-paper";


const SendVerificationScreen = () => {
  const [email, setEmail] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");

  function confirmEmail() {
    console.log("submit");
  }

  return (
      <SafeAreaView style={styles.mainContainer}>
        <Image source={require('../../assets/Wlobby-logos_transparent.png')} style={styles.logo}/>
        <TextInput style={styles.textInput} label="Email" value={email}
                   onChangeText={email => setEmail(email)}/>
        <TextInput style={styles.textInput} label="Verification Code" value={verificationCode}
                   onChangeText={verificationCode => setVerificationCode(verificationCode)}/>
        <Button style={styles.button} icon="check" mode="contained"
                onPress={() => confirmEmail()}>
          Confirm Email
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
  button : {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10
  },
});
