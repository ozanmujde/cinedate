import {FlatList, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from "react-navigation";
import PendingAppealsComponent from "../Components/PendingAppealsComponent";
import {useNavigation} from "@react-navigation/native";
import useResults from "../hooks/useResults";
import {getAdverts} from "../hooks/wlobbyGetters";


function InboxScreen() {
    const data = [
        {
            "filmName": "Lord Of The Rings",
            "ownerName": "John",
            "status": "Approved",
        },
        {
            "filmName": "Harry Potter",
            "ownerName": "Mike",
            "status": "Rejected",
        },
        {
            "filmName": "Star Wars",
            "ownerName": "Sara",
            "status": "Approved",
        },
        {
            "filmName": "Recep İvedik 4",
            "ownerName": "Omer",
            "status": "Pending",
        },
    ];
    const navigation = useNavigation();
    const [films, setFilms] = React.useState([]);

    const [getAdvertsData, adverts, errorMessageGetAdverts, loading] = getAdverts();

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
    const [filmIDs, setFilmIDs] = React.useState([]);

    useEffect(() => {
        let ids = [];
        getAdvertsData().then(() => {
            getFilms();
        });
        // for(let advert of adverts){
        //     console.log(adverts)
        //     ids.push(advert.filmID);
        //     setFilmIDs(ids);
        // }
        // getMoviesDetails(filmIDs).then((res) => {
        //     getFilms();
        // });

    }, []);

    function getFilms() {
        if (adverts) {
            let ids = [];
            for (let advert of adverts) {
                ids.push(advert.FilmID);
                setFilmIDs(ids);
            }
            getMoviesDetails(ids)
        }
    }

    const handleRenderItem = (item, index, advertItem) => {
        console.log(item, index);
        console.log(advertItem);
        return (
            <PendingAppealsComponent  ownerName={"omer"} navigation={navigation}
                                     pendingStatus={"Pending"} advert={advertItem} movieID={advertItem.FilmID}
                                     moviesInfos={"adsada"} filmName={item.original_title} />
        );
    }
    return (
        <SafeAreaView style={styles.container} forceInset={{top: "always"}}>
            <FlatList
                data={adverts}
                renderItem={({item, index}) => handleRenderItem(moviesInfos[index], index, item)}
                keyExtractor={(item, index) => item.AdvertID}
            />
        </SafeAreaView>
    );
};

export default InboxScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },
});

