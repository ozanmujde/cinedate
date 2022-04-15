import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
const BACKDROP_HEIGHT = height * 0.65;

const Backdrop = ({ path }) => {
  const uri = "https://image.tmdb.org/t/p/w370_and_h556_multi_faces/" + path;
  // console.log(`https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`);
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}` }}
        style={{
          width,
          height: BACKDROP_HEIGHT,
          position: "absolute",
        }}
      />

      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};
export default Backdrop;
