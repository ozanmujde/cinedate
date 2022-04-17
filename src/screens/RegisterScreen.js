import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import User from "../classes/User";
import {countries} from "../countries";
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Context as AuthContext } from "../context/AuthContext";
import { getUsers } from "../hooks/wlobbyGetters";
import getRandomAvatar from "../classes/avatars";
import {
    Avatar,
    Button,
    Card,
    Dialog,
    Divider,
    HelperText,
    Portal,
    Provider,
    RadioButton,
    Subheading,
    TextInput,
} from 'react-native-paper';
import {DatePickerInput} from "react-native-paper-dates";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import { AvatarGenerator } from "random-avatar-generator";
import { SvgUri } from "react-native-svg";


const RegisterScreen = () => {
    const [username,setUserName] = React.useState("");
    const { signUp ,state  } = useContext(AuthContext);
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [sex, setSex] = React.useState("");
    const [adverts, setAdverts] = React.useState([]);
    const [age, setAge] = React.useState(0);
    const [location, setLocation] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [profilePhoto, setProfilePhoto] = React.useState("");
    const [likedFilms, setLikedFilms] = React.useState([]);
    const [watchedFilms, setWatchedFilms] = React.useState([]);
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [secureTextEntryForConfirm, setSecureTextEntryForConfirm] = React.useState(true);
    const [user,setUser] = React.useState(new User("","","","",
        [],-1, "","","",[]));
    const generator = new AvatarGenerator();
    const [randomAvatar, setRandomAvatar] = React.useState(generator.generateRandomAvatar());

    const initialBirthday = [
        { id: "day", value: 16 },
        { id: "month", value: 4 },
        { id: "year", value: 1970 },
    ];
    const [birthday, setBirthday] = React.useState(new Date());

    const [open,setOpen] = React.useState(false);
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
    let avatarPath = "";

    const [value, setValue] = React.useState(null);
    const [isFocus, setIsFocus] = React.useState(false);

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    function setCountryCode(country){
        setLocation(country);
    }
    const handleSelect = (country) => {
        setLocation(country);
    }
    const navigation = useNavigation();

    function handleSubmit() {
        setUserName((name.toLowerCase() + surname.toLowerCase() + Math.floor(Math.random() * 100)).toString());
        if(email !== "" && name !== "" && surname !== "" && location !== "" && sex !== "" && randomAvatar !== "") {
            var flag = true; //true means email has not registered yet
           // console.log(randomAvatar,sex,email,bio,name,surname,age,name.toLowerCase() + surname.toLowerCase() + Math.floor(Math.random() * 100));

            axios.post('https://wlobby-backend.herokuapp.com/get/users/').then((response) => {
                //console.log("bbbb",response);
                for (var i = 0; i <response.data.Items.length; i++) {
                    var user = response.data.Items[i];
                    var emailDataBase=user.Email;
                    if (emailDataBase===email){
                        flag=false;
                    }


                }
                signUp({email:email.toString(), password:password.toString(),username:username.toString()});


                if (flag&&state.isSignUp===true){
                    axios.post('https://wlobby-backend.herokuapp.com/create/user/',{
                        'ProfilePhoto': randomAvatar,
                        'Sex' : sex.toString(),
                        'Email': email.toString(),
                        'About': bio.toString(),
                        'Name': name.toString(),
                        'Surname': surname.toString(),
                        'Age': age,
                        'Username': username.toString(),
                    }).then((response) => {
                        console.log("aaaa",response.data);
                        alert("Please confirm your Email!");
                        navigation.navigate("SendVerificationScreen");

                    });
                }
                else{
                    alert("Email registered already");
                }

            });




        }
        else {
            alert("Please fill required areas!");
        }
    }

    const arePasswordsSame = () => {
        return password !== confirmPassword && confirmPassword.length > 0;
    }
    const renderItem = (item) => {
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
    const handleRandomizeButton = () => {
        setRandomAvatar(generator.generateRandomAvatar());
    }

    function handleRegister() {


    }

    function handleBirthday(d) {
        setBirthday(d);
        const tempAge = (new Date().getFullYear() - birthday.getFullYear()).toString();
        setAge(tempAge);
    }

    function handleOnChangeEmail(email) {
        setEmail(email)
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView contentContainerStyle={{paddingBottom: '100%'}} showsVerticalScrollIndicator={false}>
                <Image source={require('../../assets/Wlobby-logos_transparent.png')} style={styles.logo}/>
                {/* <Card.Content> */}
                    <SafeAreaView>
                        <SvgUri width="100" height="100" uri={randomAvatar}
                         style={{
                            alignSelf: 'center'
                            }}/>
                        <Button onPress={handleRandomizeButton}>GET RANDOM</Button>
                        <TextInput style={styles.textInput} label="Email" value={email}
                                   onChangeText={email => handleOnChangeEmail(email)}/>
                        <TextInput style={styles.textInput} label="Name" value={name}
                                   onChangeText={name => setName(name)}/>
                        <TextInput style={styles.textInput} label="Surname" value={surname}
                                   onChangeText={surname => setSurname(surname)}/>
                        <DatePickerInput
                            style={styles.textInput}
                            label="Birthday"
                            value={birthday}
                            onChange={(d) => handleBirthday(d)}
                            inputMode="start"
                            validRange={{
                                endDate: new Date(),
                            }}
                            saveLabel="Save"
                            animationType="slide"
                            locale={'en'}/>
                        <TextInput disabled={true} style={styles.age} label="Age"
                                   value={(new Date().getFullYear() - birthday.getFullYear()).toString()}/>
                        <TextInput style={styles.textInput}
                                   label="Tell people about yourself (Bio)"
                                   multiline={true}
                                   error={bio.length > 100}
                                   value={bio} onChangeText={setBio}
                                   placeholder="Tell people about yourself"
                                   maxLength={100}
                                   right={<TextInput.Affix text={"/" + (100 - bio.length)}/>}
                        />
                        <Divider style={{borderWidth: 0.4}}/>
                        <Divider style={{borderWidth: 0.1}}/>
                        <Provider>
                            <View style={{
                                borderWidth: 1,
                                width: "50%",
                                borderRadius: 5,
                                margin: 5,
                                alignSelf: "center",
                                borderColor: "#6200ed"
                            }}>
                                <Button onPress={showDialog}>{sex ? sex : "Select Sex"}</Button>
                                <Portal>
                                    <Dialog visible={visible} onDismiss={hideDialog}>
                                        <Dialog.Title>Select Sex</Dialog.Title>
                                        <Dialog.Content>
                                            <RadioButton.Group onValueChange={value => setSex(value)} value={sex}>
                                                <RadioButton.Item style={{width: '100%'}} color="#6200ed" label="Male"
                                                                  value="male"/>
                                                <RadioButton.Item style={{width: '100%'}} color="#6200ed" label="Female"
                                                                  value="female"/>
                                                <RadioButton.Item style={{width: '100%'}} color="#6200ed" label="Other"
                                                                  value="other"/>
                                            </RadioButton.Group>
                                        </Dialog.Content>
                                        <Dialog.Actions>
                                            <Button onPress={hideDialog}>Done</Button>
                                        </Dialog.Actions>
                                    </Dialog>
                                </Portal>
                            </View>
                        </Provider>
                        <Divider style={{borderWidth: 0.4}}/>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Subheading style={{paddingLeft: 10}}>Country</Subheading>
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
                                    setCountryCode(item.value);
                                }}
                                renderLeftIcon={() => (
                                    <AntDesign style={styles.icon} color="black" name="Safety" size={20}/>
                                )}
                                renderItem={renderItem}
                            />
                        </View>
                        <TextInput
                            style={styles.textInput}
                            label="Password"
                            secureTextEntry={secureTextEntry}
                            value={password}
                            onChangeText={password => setPassword(password)}
                            right={
                                <TextInput.Icon
                                    name={secureTextEntry ? "eye" : "eye-off"}
                                    onPress={() => {
                                        setSecureTextEntry(!secureTextEntry);
                                        return false;
                                    }}
                                />
                            }
                        />
                        <TextInput
                            style={styles.textInput}
                            label="Confirm Password"
                            secureTextEntry={secureTextEntryForConfirm}
                            value={confirmPassword}
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                            right={
                                <TextInput.Icon
                                    name={secureTextEntryForConfirm ? "eye" : "eye-off"}
                                    onPress={() => {
                                        setSecureTextEntryForConfirm(!secureTextEntryForConfirm);
                                        return false;
                                    }}
                                />
                            }
                        />
                        <HelperText type="error" visible={arePasswordsSame()}>Passwords must match</HelperText>
                        <Button style={styles.button} icon="check" mode="contained"
                                onPress={() => handleSubmit()}>
                            Submit
                        </Button>
                    </SafeAreaView>
                {/* </Card.Content> */}
            </ScrollView>
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
    button : {
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 10
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
        margin: 16,
        height: 50,
        borderRadius: 12,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#6200ed",
        backgroundColor: "#fff",
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        width: "70%",
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
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
    label: {
        position: "absolute",
        backgroundColor: "white",
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    textInput: {
        marginTop: 10,
        backgroundColor: "#fff",
    },
    headline: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: '100%',
        height: '20%',
    },
    age: {
        marginTop: -15,
        backgroundColor: '#fff',
    },
});
