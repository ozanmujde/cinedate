import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FlipcardComponent from "../components/FlipcardComponent";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import InboxScreen from "../screens/InboxScreen";
import SetScreen from "../screens/SetScreen";
import {
  Provider as AuthProvider,
  Context as AuthContext,
} from "../context/AuthContext";

const router = () => {
  const { state } = useContext(AuthContext);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  //TODO: Add the AuthContext to the App component
  return (
    <NavigationContainer>
      {state.isSignedIn == false ? (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Flipcard" component={FlipcardComponent} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Set" component={SetScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Inbox" component={InboxScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default router;
