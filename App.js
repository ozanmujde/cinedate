import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
const navigator = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: "LoginScreen",
    // dont show header for LoginScreen
    //headerMode: "none",
  }
);

export default createAppContainer(navigator);
