import {getAdverts, getUsers} from "../hooks/wlobbyGetters";
import React, {useEffect, useLayoutEffect} from "react";
import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Button, Card, DataTable, Provider} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {ScrollView} from "moti";
import axios from "axios";
import DataTableCell from "react-native-paper/src/components/DataTable/DataTableCell";
import useResults from "../hooks/useResults";
import tmdb from "../api/tmdb";

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

const AdminAdverts = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  useLayoutEffect(() => {
    getadverts().then(r => console.log(adverts.length));
  }, []);
  const [adverts, setAdverts] = React.useState([]);
  async function getadverts() {
    try {
      const res = await axios.get(
          "https://wlobby-backend.herokuapp.com/get/adverts/"
      );
      res.data.Items.map(item => {
        if (!adverts.includes(item)) {
          setAdverts(adverts => [...adverts, item]);
        }
      });
    } catch (error) {
      console.log(error);
    }
    return adverts;
  }

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const [
    searchMovieApi,
    errorMessage,
    results,
    getMovieDetails,
    getMoviesDetails,
    movieInfo,
    moviesInfos,
    isLoading,
  ] = useResults();

  function handleDeleteAllAdverts() {
    adverts.map(advert => {
      axios.post(
          "https://wlobby-backend.herokuapp.com/delete/advert/" + advert.AdvertID)
          .then(res => console.log(res.data));
    });
  }
  const navigation = useNavigation();

   function handleRender(advert) {
    return (
        <View>
        <DataTable.Row onPress={() => navigation.navigate("ModalRowOptionsAdvert", {advertData: advert})}>
          <DataTable.Cell>{advert.AdvertID}</DataTable.Cell>
          <DataTable.Cell >{advert.AttendeePreference}</DataTable.Cell>
          <DataTable.Cell numeric>{advert.FilmID}</DataTable.Cell>
          <DataTable.Cell numeric>{advert.OwnerID}</DataTable.Cell>
          <DataTable.Cell numeric style={{marginRight: 10}}>{advert.Quota}</DataTable.Cell>
          <DataTable.Cell numeric>{advert.Date.split(" ")[0]}</DataTable.Cell>
          <DataTable.Cell numeric>{advert.Date.split(" ")[1]}</DataTable.Cell>
        </DataTable.Row>
        </View>
    )
  }

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
                    page * numberOfItemsPerPage + numberOfItemsPerPage).map(advert => handleRender(advert))
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
            <Button style={styles.buttonDelete} icon="delete-outline" mode="contained"
                    onPress={() => handleDeleteAllAdverts()}>
              DELETE ALL Adverts
            </Button>
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
  buttonDelete: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#ff0000",
  },
});
