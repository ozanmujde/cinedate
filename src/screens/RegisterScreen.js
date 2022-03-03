import {Button, Keyboard, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {TextInput, TouchableOpacity, TouchableWithoutFeedback} from "react-native-gesture-handler";
import User from "../classes/User";
import NumberPlease from "react-native-number-please";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {countries} from "../countries";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';


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
        [],-1, "","","",[]));

    const initialBirthday = [
        { id: "day", value: 16 },
        { id: "month", value: 4 },
        { id: "year", value: 1970 },
    ];
    const [birthday, setBirthday] = useState(initialBirthday);

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
    const [isFocus, setIsFocus] = useState(false);

    function setCountryCode(country){
        setLocation(country);
    }
    const handleSelect = (country) => {
        setLocation(country);
    }

    function handleSubmit() {
        if(email != "" && name != "" && surname != "" && location != "") {
            setUser(new User(email, name, surname, sex,[],
                age,location,"","",[],[]));
            console.log(user);
            alert("You have registered");
        }
        else {
            alert("Please fill required areas!");
        }

    }

    const renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
            </View>
        );
    };

    return (
        <SafeAreaView 
        style={styles.container}
        forceInset={{ top: "always" }}
        >
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
            values={birthday}
            onChange={value1 => setBirthday(value1)}/> : null}
            <Text>{birthday[0].value + "/" + birthday[1].value + "/" + birthday[2].value}</Text>
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
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={countries}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                    setLocation(item.value);
                }}
                renderLeftIcon={() => (
                    <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                )}
                renderItem={renderItem}
            />
            <TouchableOpacity style={styles.button} onPress={() => {
                handleSubmit()}}>
                <Text>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
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
    },
    dropdown: {
        height: 50,
        minWidth: 200,
        borderColor: "gray",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: "absolute",
        backgroundColor: "white",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

});
