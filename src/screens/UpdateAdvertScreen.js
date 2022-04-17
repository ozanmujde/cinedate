import {Alert, Image, LogBox, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationActions as navigation, SafeAreaView} from "react-navigation";
import {Button, Card, Headline, HelperText, Menu, Switch, TextInput} from 'react-native-paper';
import {DatePickerInput, enGB, registerTranslation, TimePickerModal} from 'react-native-paper-dates'
import useResults from "../hooks/useResults";
import axios from "axios";
import "intl";
import 'intl/locale-data/jsonp/en';
import {Time} from "react-native-gifted-chat";
import {useNavigation} from "@react-navigation/native";

registerTranslation('en-GB', enGB);

const UpdateAdvertScreen = ({ route: { params } }) => {
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  const [filmName, setFilmName] = React.useState(params.movieName);
  const [quota, setQuota] = React.useState(params.advert.Quota.toString());

  const onChangeFilmName = filmName => setFilmName(filmName);
  const onChangeQuota = quota => setQuota(quota);

  const hasErrors = () => {
    return quota.toString().length >= 2;
  };
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [date, setDate] = React.useState(params.date);
  const [time, setTime] = React.useState(params.time);

  const handleChangeDate = (date) => {
    setDate(date.toLocaleDateString());
  };

  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
      ({hours, minutes}) => {
        setVisible(false);
        setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      },
      [setVisible]
  );

  const [menSwitch, setMenSwitch] = React.useState(params.advert.AttendeePreference === "male" || params.advert.AttendeePreference === "all" );
  const [womenSwitch, setWomenSwitch] = React.useState(params.advert.AttendeePreference === "female" || params.advert.AttendeePreference === "all");
  const [comment, setComment] = React.useState(params.advert.Description);
  const [searchMovieApi, errorMessage, results] = useResults();
  let filmNames = [];

  const [value, setValue] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isPressedSuggestion, setIsPressedSuggestion] = useState(false);
  const [uri, setUri] = useState(null);
  const [filmID, setFilmID] = useState(null);
  const navigation = useNavigation();

  const filterData = (text) => {
    filmNames = results.map(result => result.original_title);
    return filmNames;
  };

  useEffect(() => {
    searchMovieApi(filmName);
  }, [filmName]);

  const onToggleMenSwitch = () => setMenSwitch(!menSwitch);
  const onToggleWomenSwitch = () => setWomenSwitch(!womenSwitch);

  function handleOnBlur() {
    if(isPressedSuggestion) {
      setMenuVisible(false);
    }
  }

  const [attendeePreferences, setAttendeePreferences] = useState(params.advert.AttendeePreference);
  function handleSubmit() {
    if(menSwitch && womenSwitch) {
      setAttendeePreferences("all");
    }
    else if(!menSwitch && womenSwitch) {
      setAttendeePreferences("female");
    }
    else if(menSwitch && !womenSwitch) {
      setAttendeePreferences("male");
    }
    searchMovieApi(filmName);

    Alert.alert(
        "Advert Will Be Updated",
        "Are you sure you want to update this advert?",
        [
          {
            text: "Yes",
            onPress: () => {
              const newData= {
                ...params.advert,
                Date : date.toLocaleDateString() + " " + time.toString(),
                AttendeePreference : attendeePreferences,
                Description : comment,
                Quota : quota.toString(),
                OwnerID: params.advert.OwnerID.toString(),
                FilmID: params.advert.FilmID.toString(),
                AdvertID: params.advert.AdvertID.toString(),
              };

              const jsonData = JSON.stringify(newData);

              console.log("JsonData", jsonData);
              var config = {
                method: 'put',
                url: 'https://wlobby-backend.herokuapp.com/update/advert/',
                headers: {},
                data: jsonData,
              };

              axios(config)
                  .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    navigation.navigate("Home");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            },
          },
          {
            text: "No",
          },
        ]
    );



    // axios.post('https://wlobby-backend.herokuapp.com/create/advert/',{
    //   'Date': (date.toLocaleDateString() + " " + time.toString()).toString(),
    //   'AttendeePreference' : attendeePreferences.toString(),
    //   'Description': comment.toString(),
    //   'FilmID': filmID.toString(),
    //   'OwnerID': '7',
    //   'Quota': quota.toString(),
    //   'Status': "Active"
    // }).then((response) => {
    //   if(response.data.status === "Success") {
    //     alert("Advert created successfully");
    //   }
    //   else {
    //     alert("Advert creation failed");
    //   }
    // })
  }

  function deleteAdvert() {
    Alert.alert(
        "Advert Will Be Deleted",
        "Are you sure you want to delete this advert?",
        [
          {
            text: "Yes",
            onPress: () => {
              axios.post('https://wlobby-backend.herokuapp.com/delete/advert/?AdvertID=' + params.advert.AdvertID).then((response) => {
                console.log("response data", response.data);
                if(response.data.Status === "Success") {
                  alert("Advert deleted successfully");
                  navigation.navigate("Home");
                }
                else {
                  alert("Advert deletion failed");
                }
              })
            },
          },
          {
            text: "No",
          },
        ]
    );
  }

  return (
      <SafeAreaView style={styles.mainContainer}>
        <Image source={require('../../assets/Wlobby-logos_transparent.png')} style={styles.logo}/>
        <Card style={{width: '90%', height: '90%'}}>
          <Card.Content>
            <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: '100%'}}
                        showsVerticalScrollIndicator={false}>
              {/*<View style={styles.container}>*/}
              {/*  <TextInput*/}
              {/*      onFocus={() => {*/}
              {/*        setIsPressedSuggestion(false);*/}
              {/*        if (filmName.length === 0) {*/}
              {/*          setMenuVisible(false);*/}
              {/*        }*/}
              {/*      }}*/}
              {/*      onBlur={() => handleOnBlur()}*/}
              {/*      label={"Film Name"}*/}
              {/*      style={styles.textInput}*/}
              {/*      onChangeText={(text) => {*/}
              {/*        if (text && text.length > 0) {*/}
              {/*          setFilteredData(filterData(text));*/}
              {/*        } else if (text && text.length === 0) {*/}
              {/*          setFilteredData(filmName);*/}
              {/*        }*/}
              {/*        setMenuVisible(true);*/}
              {/*        setFilmName(text);*/}
              {/*      }}*/}
              {/*      value={filmName}*/}
              {/*  />*/}
              {/*  {menuVisible && filteredData && (*/}
              {/*      <View*/}
              {/*          style={{*/}
              {/*            flex: 1,*/}
              {/*            backgroundColor: 'white',*/}
              {/*            borderWidth: 2,*/}
              {/*            flexDirection: 'column',*/}
              {/*            borderColor: 'grey',*/}
              {/*          }}*/}
              {/*      >*/}
              {/*        {filteredData.map((datum, i) => (*/}
              {/*            <Menu.Item*/}
              {/*                key={i}*/}
              {/*                style={[{ width: '100%' , backgroundColor: 'white'}]}*/}
              {/*                icon='popcorn'*/}
              {/*                onPress={() => {*/}
              {/*                  setIsPressedSuggestion(true);*/}
              {/*                  setFilmName(datum);*/}
              {/*                  setMenuVisible(false);*/}
              {/*                }}*/}
              {/*                title={datum}*/}
              {/*            />*/}
              {/*        ))}*/}
              {/*      </View>*/}
              {/*  )}*/}
              {/*</View>*/}
              <TextInput style={styles.textInput} label="Number Of Attendees" value={quota} keyboardType='numeric'
                         onChangeText={onChangeQuota}/>
              <HelperText style={{margin: -10}} type="error" visible={hasErrors()}>
                Number Of Attendees must be less than 10!
              </HelperText>
              <TextInput style={styles.textInput}
                         label="Comments"
                         multiline={true}
                         error={comment.length > 100}
                         value={comment} onChangeText={setComment}
                         placeholder="Type something about session"
                         maxLength={100}
                         right={<TextInput.Affix text={"/" + (100 - comment.length)}/>}
              />
              <DatePickerInput
                  style={styles.textInput}
                  locale="en"
                  label="Date Of Film Session"
                  value={date}
                  onChange={(d) => handleChangeDate(d)}
                  inputMode="start"
                  validRange={{
                    startDate: new Date(),
                  }}
                  saveLabel="Save"
                  animationType="slide"
              />
              <TimePickerModal
                  visible={visible}
                  onDismiss={onDismiss}
                  onConfirm={onConfirm}
                  label="Select time"
                  uppercase={false}
                  cancelLabel="Cancel"
                  confirmLabel="Ok"
                  animationType="fade"
                  backgroundColor="white"
              />
              <Button style={{marginTop: -15}} onPress={() => setVisible(true)}>
                Pick time
              </Button>
              <TextInput label="Time" value={params.time} style={{backgroundColor: '#fff'}}/>
              <SafeAreaView style={styles.switchContainer}>
                <SafeAreaView style={styles.menSwitch}>
                  <Switch disabled={!womenSwitch} value={menSwitch} onValueChange={onToggleMenSwitch} color={'#6200ed'}/>
                  <Headline style={{fontSize: 20, paddingLeft: 10}}>Men Can Appeal</Headline>
                </SafeAreaView>
                <SafeAreaView style={styles.womenSwitch}>
                  <Switch disabled={!menSwitch} value={womenSwitch} onValueChange={onToggleWomenSwitch} color={'#6200ed'}/>
                  <Headline style={{fontSize: 20, paddingLeft: 10}}>Women Can Appeal</Headline>
                </SafeAreaView>
              </SafeAreaView>
              <Button style={styles.button} icon="popcorn" mode="contained"
                      onPress={() => handleSubmit()}>
                Change Plans!
              </Button>
              <Button style={styles.button} icon="delete-forever-outline" mode="contained"
                      onPress={() => deleteAdvert()}>
                Delete this advert
              </Button>
            </ScrollView>
          </Card.Content>
        </Card>
      </SafeAreaView>
  );
};

export default UpdateAdvertScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
  },
  textInput: {
    marginVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  button: {
    marginTop: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10
  },
  switchContainer: {
    borderWidth:1,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
    borderColor: '#6200ed',
  },
  menSwitch: {
    marginTop:10,
    marginBottom: 0,
    flexDirection: 'row',
    marginLeft: 20,
  },
  womenSwitch: {
    margin: 10,
    marginTop: 0,
    flexDirection: 'row',
    marginLeft: 20,
  },
  logo: {
    width: '100%',
    height: '20%',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
  },
});
