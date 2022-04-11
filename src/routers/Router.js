import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { StyleSheet } from "react-native";
import Login from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FlipcardComponent from "../Components/FlipcardComponent";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import InboxScreen from "../screens/InboxScreen";
import SetScreen from "../screens/SetScreen";
import ResultScreen from "../screens/ResultScreen";
import ChatScreens from "../screens/ChatScreens";
import ChatScreen from "../screens/ChatScreen";
import { Context as AuthContext } from "../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";

const router = () => {
  const { state } = useContext(AuthContext);
  const Stack = createNativeStackNavigator();
  //TODO: Add the AuthContext to the App component
  return (
    <NavigationContainer>
      {state.isSignedIn == false ? (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
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
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ResultScreen" component={ResultScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Set"
        component={SetScreen}
        options={{
          tabBarLabel: "Set",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="InboxRoot"
        component={TopTabNavigator}
        options={{
          tabBarLabel: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-mail" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
        initialParams={{
          userID: "7",
        }}
      />
    </Tab.Navigator>
  );
};

const TopTabNavigator = () => {
  const TopTab = createMaterialTopTabNavigator();
  return (
    <TopTab.Navigator
      initialRouteName="Inbox"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
      }}
      style={styles.TopTabStyle}
    >
      <TopTab.Screen name="Inbox" component={InboxScreen} />
      <TopTab.Screen name="ChatScreens" component={ChatScreens} />
    </TopTab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3.5,
    elevation: 5,
    borderRadius: 10,
  },
  TopTabStyle: {
    backgroundColor: "white",
    paddingTop: 25,
  },
});

export default router;
