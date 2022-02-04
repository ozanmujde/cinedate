import {Button, Keyboard, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput, TouchableOpacity, TouchableWithoutFeedback} from "react-native-gesture-handler";
import User from "../classes/User";
import NumberPlease from "react-native-number-please";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {countries} from "../countries";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [sex, setSex] = useState("");
    const [adverts, setAdverts] = useState([]);
    const [age, setAge] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [likedFilms, setLikedFilms] = useState([]);
    const [watchedFilms, setWatchedFilms] = useState([]);

    const [user,setUser] = useState(new User("","","","",
        [],-1, "","",[],[]));

    const initialBirthday = [
        { id: "day", value: 16 },
        { id: "month", value: 4 },
        { id: "year", value: 1970 },
    ];
    const [birthday, setBirthday] = useState(initialBirthday);
    const [country, setCountry] = useState("");

    const [open,setOpen] = useState(false);
    const date = [
        { id: "day", label: "", min: 1, max: 31 },
        { id: "month", label: "", min: 1, max: 12 },
        { id: "year", label: "", min: 1900, max: new Date().getFullYear()}
    ]
    const radio_props = [
        {label: 'Male', value: 0},
        {label: 'Female', value: 1},
        {label: 'Other', value: 2}
    ];
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(countries);
    let setCountryCode = (country) => {
        setCountry(country);
    }
    const handleSelect = (country) => {
        setCountry(country);
    }
    let data = [{
        value: 'Banana',
    }, {
        value: 'Mango',
    }, {
        value: 'Pear',
    }];
    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput style={[styles.input, styles.inputContainer]}
                       onChangeText={(text) => setEmail(text)} placeholder={"EMAIL"}
            />

            <Text>Name</Text>
            <TextInput style={[styles.input, styles.inputContainer]}
                       placeholder={"NAME"}
            onChangeText={text => setName(text)}></TextInput>

            <Text>Surname</Text>
                <TextInput style={[styles.input, styles.inputContainer]}
                           placeholder={"SURNAME"}
                           onChangeText={text => setSurname(text)}></TextInput>
            <Text>Date of Birth</Text>
            <Button title={"Pick Date"} onPress={() => setOpen(!open)}/>
            {open ? <NumberPlease
                digits={date}
                value={birthday}/> : null}
            <Text>Age</Text>
            <TextInput style={[styles.input, styles.inputContainer]}
                       placeholder={"AGE"}
                       onChangeText={text => setAge(text)}
                       keyboardType='numeric'></TextInput>
            <Text>Sex</Text>
            <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                animation={true}
                onPress={(value) => setSex(value)}
            />
            <Text>Country</Text>
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1
    },
    inputContainer: {
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
        textAlign: "left"
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
    rowContainer : {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    }

});
