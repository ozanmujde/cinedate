import {getAdverts, getUsers} from "../hooks/wlobbyGetters";
import React, {useEffect} from "react";
import {SafeAreaView, StyleSheet, View} from "react-native";
import {Card, DataTable, Provider} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "moti";
import axios from "axios";
import DataTableCell from "react-native-paper/src/components/DataTable/DataTableCell";

const numberOfItemsPerPageList = [10, 20, 50];

const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
];

const AdminAdverts = ({ route: { params } }) => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);


  let adverts = [];
  async function getadverts() {
    try {
      const res = await axios.get(
          "https://wlobby-backend.herokuapp.com/get/adverts/"
      );
      res.data.Items.map(item => {
        if (!adverts.includes(item)) {
          adverts.push(item);
        }
      });
    } catch (error) {
      console.log(error);
    }

    return adverts;
  }
  useEffect(() => {
    getadverts();
  }, []);
  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);


  return (
      <Provider>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.container} forceInset={{top: "always"}}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>ID</DataTable.Title>
                <DataTable.Title>Preference</DataTable.Title>
                <DataTable.Title>FilmID</DataTable.Title>
                <DataTable.Title>OwnerID</DataTable.Title>
                <DataTable.Title numeric>Quota</DataTable.Title>
                <DataTable.Title numeric>Date</DataTable.Title>
                <DataTable.Title numeric>Time</DataTable.Title>
              </DataTable.Header>
              {
                adverts.slice(page * numberOfItemsPerPage,
                    page * numberOfItemsPerPage + numberOfItemsPerPage).map(advert => (
                    <DataTable.Row onPress={() => console.log("pressed")}>
                      <DataTable.Cell>{advert.AdvertID}</DataTable.Cell>
                      <DataTable.Cell>{advert.AttendeePreference}</DataTable.Cell>
                      <DataTable.Cell>{advert.FilmID}</DataTable.Cell>
                      <DataTable.Cell>{advert.OwnerID}</DataTable.Cell>
                      <DataTable.Cell numeric>{advert.Quota}</DataTable.Cell>
                      <DataTable.Cell>{advert.Date.split(" ")[0]}</DataTable.Cell>
                      <DataTable.Cell>{advert.Date.split(" ")[1]}</DataTable.Cell>
                    </DataTable.Row>
                ))
              }
              <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.ceil(adverts.length / numberOfItemsPerPage)}
                  onPageChange={page => setPage(page)}
                  label={`${from + 1}-${to} of ${adverts.length}`}
                  showFastPaginationControls
                  numberOfItemsPerPageList={numberOfItemsPerPageList}
                  numberOfItemsPerPage={numberOfItemsPerPage}
                  onItemsPerPageChange={onItemsPerPageChange}
                  selectPageDropdownLabel={'Rows per page'}
              />
            </DataTable>
          </ScrollView>
        </SafeAreaView>
      </Provider>
  );
};

export default AdminAdverts;

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
