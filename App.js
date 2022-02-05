import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import FlipcardComponent from "./src/Components/FlipcardComponent";
const navigator = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    Home: HomeScreen,
    Register : RegisterScreen,
    Flipcard: FlipcardComponent
  },
  {
    initialRouteName: "LoginScreen",
    // dont show header for LoginScreen
    //headerMode: "none",
  }
);

export default createAppContainer(navigator);
