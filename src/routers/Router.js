import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import FlipcardComponent from "../Components/FlipcardComponent";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import InboxScreen from "../screens/InboxScreen";
import SetScreen from "../screens/SetScreen";
import ResultScreen from "../screens/ResultScreen";
import ChatScreen from "../screens/ChatScreen";
import { Ionicons } from "@expo/vector-icons";
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
            name="Inbox"
            component={InboxScreen}
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
                <Ionicons
                  name="person-circle-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Stack.Screen name="ResultShow" component={ResultScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );

  //     >
  //       <Tab.Screen name="Home" component={HomeScreen} />
  //       <Tab.Screen name="Search" component={SearchScreen} />
  //       <Tab.Screen name="Set" component={SetScreen} />
  //       <Tab.Screen name="Profile" component={ProfileScreen} />
  //       <Tab.Screen name="Inbox" component={InboxScreen} />
  //     </Tab.Navigator>
  //   )}
  // </NavigationContainer>
  // );
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
});

export default router;
