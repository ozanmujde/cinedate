import {TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import useResults from "../hooks/useResults";
import {Avatar, Card, IconButton} from "react-native-paper";
import tmdb from "../api/tmdb";
import axios from "axios";

let result;
const AutomaticPendingAppeals = ({advert, navigation, movieID, pendingStatus, isMyAdvert, pendingUsers}) => {
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

  const [uri, setUri] = React.useState("");
  useEffect(() => {
    getMovieDetails(movieID);
  }, [movieID]);

  const [showButton, setShowButton] = React.useState(true);

  const function1 = async () => {
    try {
      const response = await tmdb.get("/search/movie", {
        params: {
          query: movieInfo.original_title,
        },
      });
      result = response.data.results[0];
    } catch (err) {
      console.log("Something went wrong");
    }

    setUri("https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + result.poster_path);
    navigation.navigate('ResultScreen', {
      id: result.id,
      image: uri,
      isDetailScreen: true,
      filmID: movieID,
      advert: advert
    });
  };

  const returnBackgroundColor = () => {
    if (pendingStatus === "Pending") {
      return "#FFD700";
    } else if (pendingStatus === "Approved") {
      return "#71C562";
    } else if (pendingStatus === "Rejected") {
      return "#BE1F35";
    }
  }

  const toggleButton = () => {
    setShowButton(false);
  };

  const setVisibleTrue = () => {
  };

  const setVisibleFalse = () => {
  };

  const returnIconType = () => {
    if (pendingStatus === "Pending") {
      return "timer";
    } else if (pendingStatus === "Approved") {
      return "check-circle-outline";
    } else if (pendingStatus === "Rejected") {
      return "close";
    }
  }
  const handleLeft = (props) => {
    return (
        <TouchableOpacity>
          <Avatar.Icon  {...props} style={{backgroundColor: returnBackgroundColor()}} icon={returnIconType()}/>
        </TouchableOpacity>
    );
  }


  function acceptUser(user) {
  console.log(advert.AdvertID);
    axios.post('https://wlobby-backend.herokuapp.com/accept/user/?AdvertID=' + advert.AdvertID + "&UserID="+ user)
        .then((response) => {
      console.log(response.data);
      if(response.status === "Success") {
        alert("Nice! You will watch this movie with " + user + "!");
      }
      else {
        alert("An error occured");
      }
    })
  }

  const renderLeftActions = (props, user) => {
    return (
        <View style={{flexDirection: 'row'}}>
          {
            isMyAdvert === 0 || isMyAdvert === 1 ?
                <TouchableOpacity>
                  <IconButton icon="delete" style={{backgroundColor: 'red'}}
                              onPress={toggleButton}/>
                </TouchableOpacity> : null
          }
          {
            isMyAdvert === 2 ? <>
                  <TouchableOpacity>
                    <IconButton icon="check-circle-outline" style={{backgroundColor: 'green'}}
                                onPress={() => acceptUser(user)}/>

                  </TouchableOpacity>
                  <TouchableOpacity>
                    <IconButton icon="alpha-x-circle-outline" style={{backgroundColor: 'red'}}
                                onPress={() => console.log("")}/>

                  </TouchableOpacity>
                </>
                : null
          }

        </View>
    );
  };
  const [dialogVisible, setDialogVisible] = React.useState(false);

  function renderCurrentCard() {
    if (isMyAdvert === 2) {
      if (pendingUsers.length !== 0) {
        pendingUsers.map(user => {
          console.log(user);
          return (
              <View>
                <TouchableOpacity onPress={() => function1()}>
                  <Card.Title style={{borderWidth: .5, borderColor: "black"}}
                              title={isLoading ? "Loading..." : movieInfo.original_title}
                              subtitle={user.toString()}
                              left={(props) => handleLeft(props)}
                              right={(props) => renderLeftActions(props)}
                  />
                </TouchableOpacity>
              </View>
          )
        })
        return (
            <View>
              <TouchableOpacity onPress={() => function1()}>
                <Card.Title style={{borderWidth: .5, borderColor: "black"}}
                            title={isLoading ? "Loading..." : movieInfo.original_title}
                            subtitle={user.toString()}
                            left={(props) => handleLeft(props)}
                            right={(props) => renderLeftActions(props, user)}
                />
              </TouchableOpacity>
            </View>
        )
      }
    }
    return (
        <TouchableOpacity onPress={() => function1()}>
          <Card.Title style={{borderWidth: .5, borderColor: "black"}}
                      title={isLoading ? "Loading..." : movieInfo.original_title}
                      subtitle={"omer"}
                      left={(props) => handleLeft(props)}
                      right={(props) => renderLeftActions(props)}
          />
        </TouchableOpacity>
    );
  }

  return (
      <>
        {
          showButton
              ? pendingUsers.length !== 0
                  ? pendingUsers.map(user => {
                    return (
                        <View>
                          <TouchableOpacity onPress={() => function1()}>
                            <Card.Title style={{borderWidth: .5, borderColor: "black"}}
                                        title={user}
                                        subtitle={isLoading ? "Loading..." : movieInfo.original_title}
                                        left={(props) => handleLeft(props)}
                                        right={(props) => renderLeftActions(props, user)}
                            />
                          </TouchableOpacity>
                        </View>
                    );
                  })
                  : <TouchableOpacity onPress={() => function1()}>
                    <Card.Title style={{borderWidth: .5, borderColor: "black"}}
                                title={isLoading ? "Loading..." : movieInfo.original_title}
                                subtitle={"omer"}
                                left={(props) => handleLeft(props)}
                                right={(props) => renderLeftActions(props)}
                    />
                  </TouchableOpacity>
              : null
        }
      </>
  );
}


export default AutomaticPendingAppeals
