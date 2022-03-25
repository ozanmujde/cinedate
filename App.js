import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Router from "./src/routers/Router";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import PubNub from "pubnub";
import { PubNubProvider, usePubNub } from "pubnub-react";

const pubnub = new PubNub({
  publishKey: "pub-c-db5f1d5b-6ae2-49d4-a3de-78fa20d8843b",
  subscribeKey: "sub-c-ac9d8622-a6cd-11ec-94c0-bed45dbe0fe1",
  uuid: "Ozan",
  autoNetworkDetection: true, // enable for non-browser environment automatic reconnection
  restore: true, // enable catchup on missed messages
});
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // const { state } = useContext(AuthContext);

  //TODO: Add the AuthContext to the App component
  return (
    <AuthProvider>
      <PubNubProvider client={pubnub}>
        <Router />
      </PubNubProvider>
    </AuthProvider>
  );
}

// const switchNavigator = createSwitchNavigator({
//   loginFlow: createStackNavigator({
//     Signin: LoginScreen,
//     Signup: RegisterScreen,
//     Flipcard: FlipcardComponent, //TODO: This ll go to the next screen and component is kinda sus for me
//   }),
//   mainFlow: createBottomTabNavigator({
//     //TODO: add the other screens
//     // WE ll discuss that part for new navigatots
//     // This may change with never alternative

//     Home: HomeScreen,
//     Search: SearchScreen,
//     Set: SetScreen,
//     Inbox: InboxScreen,
//     Profile: ProfileScreen,
//   }),
// });

// export default createAppContainer(switchNavigator);
