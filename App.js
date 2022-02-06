import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import FlipcardComponent from "./src/components/FlipcardComponent";
import SearchScreen from "./src/screens/SearchScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import InboxScreen from "./src/screens/InboxScreen";
import SetScreen from "./src/screens/SetScreen";

const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    Signin: LoginScreen,
    Signup: RegisterScreen,
    Flipcard: FlipcardComponent, //TODO: This ll go to the next screen and component is kinda sus for me
  }),
  mainFlow: createBottomTabNavigator({ 
    //TODO: add the other screens
    // WE ll discuss that part for new navigatots
    // This may change with never alternative
     
    Home: HomeScreen,
    Search: SearchScreen,
    Set: SetScreen,
    Inbox: InboxScreen,
    Profile: ProfileScreen,
  }),
});

export default createAppContainer(switchNavigator);
