import {FlatList, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from "react-navigation";
import PendingAppealsComponent from "../Components/PendingAppealsComponent";
import {useNavigation} from "@react-navigation/native";
import useResults from "../hooks/useResults";
import {getAdverts} from "../hooks/wlobbyGetters";
import {Divider, Subheading, Appbar} from "react-native-paper";
import {View} from "moti";
import AutomaticPendingAppeals from "../Components/AutomaticPendingAppeals";

function InboxScreen() {
    const navigation = useNavigation();

    const [getAdvertsData, adverts, errorMessageGetAdverts, loading] = getAdverts();


    useEffect(() => {
        getAdvertsData();
    }, []);


    const handleRenderItem = (item, index, advertItem) => {
        console.log(item, index);
        console.log(advertItem)
        return (
                <AutomaticPendingAppeals
                    advert={item}
                    navigation={navigation}
                    movieID={item.FilmID}/>
        );
    }
    return (
        <View style={styles.container} forceInset={{top: "always"}}>
            <Appbar.Header >
                <Appbar.Content title="My Appeals"/>
            </Appbar.Header>
            <View style={{flex: 1}}>
                <FlatList
                    scrollEnabled={true}
                    data={adverts}
                    renderItem={({item, index}) => handleRenderItem(item, index)}
                    keyExtractor={(item, index) => item.AdvertID}
                />
            </View>

            <Divider/>
            <Appbar.Header>
                <Appbar.Content title="Incoming Appeals"/>
            </Appbar.Header>
            <View  style={{flex:1}}>
                <FlatList
                    data={adverts}
                    scrollEnabled={true}
                    renderItem={({item, index}) => handleRenderItem(item, index)}
                    keyExtractor={(item, index) => item.AdvertID}
                />
            </View>
        </View>
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

