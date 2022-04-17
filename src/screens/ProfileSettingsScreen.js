import {FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";

import React, {useState} from "react";
import {Button, Chip, Subheading, TextInput} from "react-native-paper";
import {Dropdown} from "react-native-element-dropdown";
import {useNavigation} from "@react-navigation/native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {SvgUri} from "react-native-svg";
import {AvatarGenerator} from "random-avatar-generator";
import {countries} from "../countries";
import {Ionicons} from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

//TODO: Authentication la beraber burasi degismeli
const ProfileSettingsScreen = ({route: {params}}) => {
  const userData = params.userData;
  const navigation = useNavigation();
  const [name, setName] = useState(userData.Name);
  const [surname, setSurname] = useState(userData.Surname);
  const [email, setEmail] = useState(userData.Email);
  const [about, setAbout] = useState(userData.About);
  const [bio, setBio] = useState(userData.Bio);
  const [interests, setInterests] = useState(userData.Interests);
  const [location, setLocation] = useState(userData.Location);
  const [username, setUsername] = useState(userData.Username);

  const generator = new AvatarGenerator();
  //generator.generateRandomAvatar()
  const [profilePhoto, setProfilePhoto] = useState(userData.ProfilePhoto);

  const updateNewUser = () => {
    const newData = {
      ...userData,
      Name: name,
      Surname: surname,
      Email: email,
      About: about,
      Bio: bio,
      ProfilePhoto: profilePhoto,
      Interests: interests,
      Location: location,
      Username: username,
    };
    const jsonData = JSON.stringify(newData);
    var config = {
      method: "post",
      url: "https://wlobby-backend.herokuapp.com/update/user/",
      headers: {
        "Content-Type": "application/json",
      },
      data: jsonData,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const renderDropdown = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === null && (
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
  //   console.log("userData", userData);
  return (
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: '50%'}}>
          {/* <Image
        source={require("../../assets/Wlobby-logos_transparent.png")}
        style={{
          width: "100%",
          height: "20%",
        }}
      /> */}
          <Image source={require('../../assets/Wlobby-logos_transparent.png')} style={styles.logo}/>
          <SvgUri
              width="100"
              height="100"
        uri={profilePhoto}
        style={{
          alignSelf: "center",
        }}
      />
      <Button
        onPress={() => {
          const newProfilePhoto = generator.generateRandomAvatar();
          setProfilePhoto(newProfilePhoto);
        }}
      >
        GET RANDOM
      </Button>

      <TextInput
        label="Name"
        value={name}
        style={styles.input}
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <TextInput
        label="Surname"
        value={surname}
        style={styles.input}
        onChangeText={(text) => {
          setSurname(text);
        }}
      />
      <TextInput
        label="UserName"
        value={username}
        style={styles.input}
        onChangeText={(text) => {
          setUsername(text);
        }}
      />
      <TextInput
        label="BIO"
        value={bio}
        style={styles.input}
        onChangeText={(text) => {
          setBio(text);
        }}
        multiline={true}
      />
      <TextInput
        label="About"
        value={about}
        style={styles.input}
        onChangeText={(text) => {
          setAbout(text);
        }}
        multiline={true}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Subheading style={{ paddingLeft: 10 }}>Country</Subheading>
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
          placeholder={location}
          searchPlaceholder="Search..."
          value={location}
          onChange={(item) => {
            setLocation(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          renderItem={renderDropdown}
        />
      </View>
      <Subheading style={{ paddingLeft: 10 }}>Add Interest</Subheading>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // flexWrap: "wrap",
          flexGrow: 0,
        }}
      >
        <FlatList
          data={interests}
          keyExtractor={(item) => item}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          // nestedScrollEnabled
          style={
            {
              // backgroundColor: "red",
              // width: "fit-content",
            }
          }
          renderItem={({ item }) => (
            <Chip
              style={styles.chip}
              onClose={() => {
                setInterests(interests.filter((i) => i !== item));
              }}
            >
              {item}
            </Chip>
          )}
        />
        <View style={{ flexGrow: 100 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ModalChipsScreen", {
                interests,
                setInterests,
              });
            }}
          >
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="black"
              // style={{ flex: 1 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Button
          style={{marign: 20, padding: 20}}
          icon="account-check"
          onPress={() => {
            updateNewUser();
            navigation.goBack();
          }}
      >
        Save
      </Button>
        </KeyboardAwareScrollView>

      </SafeAreaView>
  );
};

export default ProfileSettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "#fff",
    color: "#fff",
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: "70%",
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
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '20%',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
