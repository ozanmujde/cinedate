import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getAdverts } from "../hooks/wlobbyGetters";
import { Appbar, Divider } from "react-native-paper";
import { View } from "moti";
import AutomaticPendingAppeals from "../Components/AutomaticPendingAppeals";
import { Context as AuthContext } from "../context/AuthContext";
import advert from "../classes/Advert";

function InboxScreen() {
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);

  const [getAdvertsData, adverts, errorMessageGetAdverts, loading] =
    getAdverts();

  useEffect(() => {
    getAdvertsData();
  }, []);

  const handleRenderItem = (item, index, isMyAdvert) => {
    if (item.PendingRequests === null) {
      item.PendingRequests = [];
    }
    // return (
    //     <AutomaticPendingAppeals
    //         advert={item}
    //         navigation={navigation}
    //         movieID={item.FilmID}
    //         pendingStatus={"Pending"}
    //         isMyAdvert={isMyAdvert}
    //         pendingUsers={[1,2,3]}
    //     />
    // );

    if (item.OwnerID === state.userID && isMyAdvert === 0) {
      return (
        <AutomaticPendingAppeals
          advert={item}
          navigation={navigation}
          movieID={item.FilmID}
          isMyAdvert={isMyAdvert}
          pendingUsers={Object.keys(item.PendingRequests)}
        />
      );
    } else if (
      isMyAdvert === 1 &&
      Object.keys(item.AttendeeIDs).includes(state.userID.toString())
    ) {
      return (
        <AutomaticPendingAppeals
          advert={item}
          navigation={navigation}
          movieID={item.FilmID}
          pendingStatus={"Approved"}
          isMyAdvert={isMyAdvert}
          pendingUsers={item.PendingRequests}
        />
      );
    } else if (
      isMyAdvert === 1 &&
      Object.keys(item.PendingRequests).includes(state.userID.toString())
    ) {
      return (
        <AutomaticPendingAppeals
          advert={item}
          navigation={navigation}
          movieID={item.FilmID}
          pendingStatus={"Pending"}
          isMyAdvert={isMyAdvert}
          pendingUsers={item.PendingRequests}
        />
      );
    } else if (
      isMyAdvert === 2 &&
      Object.keys(item.PendingRequests).length !== 0 &&
      item.OwnerID === state.userID
    ) {
      return (
        <AutomaticPendingAppeals
          advert={item}
          navigation={navigation}
          movieID={item.FilmID}
          isMyAdvert={isMyAdvert}
          pendingUsers={item.PendingRequests}
        />
      );
    }
  };
  return (
    <View style={styles.container} forceInset={{ top: "always" }}>
      <Appbar.Header>
        <Appbar.Content title="My Adverts" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <FlatList
          scrollEnabled={true}
          data={adverts}
          renderItem={({ item, index }) => handleRenderItem(item, index, 0)}
          keyExtractor={(item, index) => item.AdvertID}
        />
      </View>
      <Appbar.Header>
        <Appbar.Content title="My Appeals" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <FlatList
          scrollEnabled={true}
          data={adverts}
          renderItem={({ item, index }) => handleRenderItem(item, index, 1)}
          keyExtractor={(item, index) => item.AdvertID}
        />
      </View>

      <Divider />
      <Appbar.Header>
        <Appbar.Content title="Incoming Appeals" />
      </Appbar.Header>
      <View style={{ flex: 1 }}>
        <FlatList
          data={adverts}
          scrollEnabled={true}
          renderItem={({ item, index }) => handleRenderItem(item, index, 2)}
          keyExtractor={(item, index) => item.AdvertID}
        />
      </View>
    </View>
  );
}

export default InboxScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});
