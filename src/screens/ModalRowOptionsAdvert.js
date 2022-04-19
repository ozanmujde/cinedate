import {Image, SafeAreaView, StyleSheet} from "react-native";
import React, {useEffect, useLayoutEffect} from "react";
import {Button, Card, TextInput} from "react-native-paper";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import {SvgUri} from "react-native-svg";
import {ScrollView} from "moti";
import useResults from "../hooks/useResults";
import tmdb from "../api/tmdb";

const ModalRowOptionsAdvert = ({route: {params}}) => {
  const navigation = useNavigation();

  function handleDeleteAdvert() {
    axios.delete('https://wlobby-backend.herokuapp.com/delete/advert/?AdvertID=' + params.advertData.AdvertID.toString())
        .then((response) => {
          console.log(response.data);
          if(response.data.Status === 'Success') {
            alert("Advert deleted successfully");
            navigation.navigate("AdminAdverts");
          }
          else {
            alert("Error deleting advert");
          }
        });
  }

  return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: '50%'}}>
          {/* <Image
        source={require("../../assets/Wlobby-logos_transparent.png")}
        style={{
          width: "100%",
          height: "20%",
        }}
      /> */}
          <Image source={require('../../assets/Wlobby-logos_transparent.png')} style={styles.logo}/>
          <Card>
            <Card.Content>
              {/*<SvgUri*/}
              {/*    width="100"*/}
              {/*    height="100"*/}
              {/*    uri={params.advertData.AdvertID}*/}
              {/*    style={{*/}
              {/*      alignSelf: "center",*/}
              {/*    }}*/}
              {/*/>*/}
              <TextInput
                  label="AdvertID"
                  value={params.advertData.AdvertID.toString()}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="Owner"
                  value={params.advertData.OwnerUsername}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="Comment"
                  value={params.advertData.Description}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="FilmID"
                  value={params.advertData.FilmID.toString()}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="Quota"
                  value={params.advertData.Quota.toString()}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="Status"
                  value={params.advertData.Status}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="Date"
                  value={params.advertData.Date.split(" ")[0].toString()}
                  disabled={true}
                  style={styles.input}
              />
              <TextInput
                  label="Attendees"
                  value={Object.entries(params.advertData.AttendeeIDs).map(([key, value]) => value).join('\n')}
                  disabled={true}
                  style={styles.input}
              />
            </Card.Content>
          </Card>

          <Button style={styles.button} icon="delete-outline" mode="contained"
                  onPress={() => handleDeleteAdvert()}>
            Delete This Advert
          </Button>

        </ScrollView>
      </SafeAreaView>

  );
};

export default ModalRowOptionsAdvert;

const styles = StyleSheet.create({
  button: {
    alignContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10
  },
  container: {
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: -10,
  },
  input: {
    backgroundColor: "#fff",
    color: "#fff",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  logo: {
    width: '100%',
    height: '20%',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffc8c8',
  },
});
