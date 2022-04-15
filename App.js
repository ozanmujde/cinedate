import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Router from "./src/routers/Router";
import { Provider as AuthProvider } from "./src/context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  // const { state } = useContext(AuthContext);

  //TODO: Add the AuthContext to the App component
  return (
    <AuthProvider>
        <Router />
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
