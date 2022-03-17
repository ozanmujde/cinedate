import {Image, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from "react-navigation";
import {Button, Divider, Headline, HelperText, Switch, TextInput} from 'react-native-paper';
import {DatePickerInput, enGB, registerTranslation, TimePickerModal} from 'react-native-paper-dates'

registerTranslation('en-GB', enGB);

const SetScreen = () => {
  const [filmName, setFilmName] = React.useState('');
  const [quota, setQuota] = React.useState('');

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
      ({hours, minutes}) => {
        setVisible(false);
        setTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
      },
      [setVisible]
  );

  const [menSwitch, setMenSwitch] = React.useState(true);
  const [womenSwitch, setWomenSwitch] = React.useState(true);
  const [comment, setComment] = React.useState("");

  const onToggleMenSwitch = () => setMenSwitch(!menSwitch);
  const onToggleWomenSwitch = () => setWomenSwitch(!womenSwitch);

  return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: '100%' }} >
        <Image source={require('../../assets/wlobby.png')} style={styles.logo}/>
        <TextInput style={styles.textInput} label="Film Name" value={filmName} onChangeText={onChangeFilmName}/>
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
        <Button style={{marginTop: -15}} onPress={() => setVisible(true)}>
          Pick time
        </Button>
        <TextInput label="Time" value={time}/>
        <SafeAreaView style={styles.switchContainer}>
          <SafeAreaView style={styles.menSwitch}>
            <Switch value={menSwitch} onValueChange={onToggleMenSwitch} color={'#6200ed'}/>
            <Headline style={{fontSize: 20, paddingLeft: 10}}>Men Can Appeal</Headline>
          </SafeAreaView>
          <SafeAreaView style={styles.womenSwitch}>
            <Switch value={womenSwitch} onValueChange={onToggleWomenSwitch} color={'#6200ed'}/>
            <Headline style={{fontSize: 20, paddingLeft: 10}}>Women Can Appeal</Headline>
          </SafeAreaView>
        </SafeAreaView>
        <Button style={styles.button} icon="popcorn" mode="contained" onPress={() => alert("Advert Has Been Created")}>
          Let's Watch
        </Button>
      </ScrollView>
  );
};

export default SetScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: '94%',
    alignSelf: 'center',
  },
  textInput: {
    marginVertical: 10,
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
});
