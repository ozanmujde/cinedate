import {StyleSheet, Image, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect} from "react";
import {SafeAreaView} from "moti";
import {Button, TextInput} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import { Context as AuthContext } from "../context/AuthContext";


const SendVerificationScreen = () => {
    const [email, setEmail] = React.useState("");
    const {confirmEmail} = useContext(AuthContext);
    const {state} = useContext(AuthContext);
    const [verificationCode, setVerificationCode] = React.useState("");
    const navigation = useNavigation();

    function handleOnPress() {

        if(email !== "" && verificationCode !== ""){
            console.log(state.isConfirmed);
            confirmEmail({email:email.toString(), code:verificationCode.toString()})

            if (state.isConfirmed===true){
                navigation.navigate("Login");
            }
            console.log("after",state.isConfirmed);


        }
        else {
            alert("Please fill required areas!");
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
