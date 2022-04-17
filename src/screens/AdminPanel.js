import {getAdverts, getUsers} from "../hooks/wlobbyGetters";
import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet} from "react-native";
import {Card, List} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

const AdminPanel = () => {

  const navigation = useNavigation();

  const [getAdvertsData, adverts, errorMessage, loading] = getAdverts();
  const [getUserData, userData, getUsersData, usersData, errorMsg] = getUsers();

  useEffect(() => {
    getAdvertsData();
    getUsersData();
  }, []);

  return (
      <SafeAreaView style={styles.container} forceInset={{top: "always"}}>
        <Card>
          <Card.Content>
            <List.Item
                title="Users"
                description="See all users"
                left={props => <List.Icon {...props} icon="account-group-outline"/>}
                onPress={() => navigation.navigate("AdminUsers", {users: usersData, adverts: adverts.data})}
            />
            <List.Item
                title="Adverts"
                description="See all adverts"
                left={props => <List.Icon {...props} icon="book-multiple"/>}
            />
          </Card.Content>
        </Card>
      </SafeAreaView>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: "100%",
    height: "10%",
    resizeMode: "contain",
    marginBottom: "5%",
  },
  button: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ed",
    // shadowColor: "#6200ed",
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.35,
    // shadowRadius: 20,
  },
});
