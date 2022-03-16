import {Image, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import { SafeAreaView } from "react-navigation";
import { HelperText, TextInput, Button, Paragraph, Dialog, Portal, Provider, Switch } from 'react-native-paper';
import {
  enGB,
  registerTranslation,
  DatePickerModal, DatePickerInput, TimePickerModal
} from 'react-native-paper-dates'
import {SafeAreaContext} from "react-native-safe-area-context";
registerTranslation('en-GB', enGB);

const SetScreen = () => {
  const [filmName, setFilmName] = React.useState('');
  const [quota,setQuota] = React.useState('');

  const onChangeFilmName = filmName => setFilmName(filmName);
  const onChangeQuota = quota => setQuota(quota);

  const hasErrors = () => {
    return quota.length >=2;
  };
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [date, setDate] = React.useState(new Date());
  const [time, setTime] = React.useState("00:00");

  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
      ({ hours, minutes }) => {
        setVisible(false);
        setTime(`${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2, '0')}`);
      },
      [setVisible]
  );

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
      <SafeAreaView style={styles.container}>
        <Image source={require('../../assets/wlobby.png')} style={styles.logo} />
        <TextInput style={styles.textInput} label="Film Name" value={filmName} onChangeText={onChangeFilmName} />
        <TextInput style={styles.textInput} label="Number Of Attendees" value={quota} keyboardType='numeric' onChangeText={onChangeQuota} />
        <HelperText type="error" visible={hasErrors()}>
          Number Of Attendees must be less than 10
        </HelperText>
        <DatePickerInput
            locale="en"
            label="Date Of Film Session"
            value={date}
            onChange={(d) => setDate(d)}
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
        />
        <Button onPress={()=> setVisible(true)}>
          Pick time
        </Button>
        <TextInput label="Time" value={time} />
        <Button style={styles.button} icon="popcorn" mode="contained" onPress={() => alert("Advert Has Been Created")}>
          Let's Watch
        </Button>
        <SafeAreaView>
          <Paragraph>SDKJSADAS</Paragraph>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
        </SafeAreaView>
      </SafeAreaView>
  );
};

export default SetScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingTop: 50,
  },
  textInput: {
    marginVertical: 10,
  },
  button : {
    marginTop: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
  },
});
