import {LogBox, TouchableOpacity, View} from "react-native";
import React, {useEffect,useContext} from "react";
import useResults from "../hooks/useResults";
import {Avatar, Card, IconButton} from "react-native-paper";
import tmdb from "../api/tmdb";
import axios from "axios";
import {Context as AuthContext} from "../context/AuthContext";

let result;
LogBox.ignoreAllLogs()
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
  const {state} = useContext(AuthContext);
  useEffect(() => {
    getMovieDetails(movieID);
    getSubTitle();
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

    let uri = ("https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + result.poster_path);
    navigation.navigate('ResultScreen', {
      id: result.id,
      image: uri,
      isDetailScreen: true,
      filmID: movieID,
      advert: advert,
      isMyAdvert: isMyAdvert,
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

  const deleteAdvert = () => {
    axios.delete('https://wlobby-backend.herokuapp.com/delete/advert/?AdvertID=' + advert.AdvertID)
      .then(res => {
        console.log(res.data)
        alert("Advert deleted");
      })
      .catch(err => {
        console.log(err);
      })
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
    } else
      return "video-account";
  }
  const handleLeft = (props) => {
    return (
        <TouchableOpacity>
          <Avatar.Icon  {...props} style={{backgroundColor: returnBackgroundColor()}} icon={returnIconType()}/>
        </TouchableOpacity>
    );
  }


  function acceptUser(userId, username) {
    // axios.post('https://wlobby-backend.herokuapp.com/update/advert/', {
    //   "Date": advert.Date.toString(),
    //   "LastUpdateDate": advert.LastUpdateDate.toString(),
    //   "RegistrationDate": advert.RegistrationDate.toString(),
    //   "AttendeePreference": advert.AttendeePreference.toString(),
    //   "Description": advert.Description.toString(),
    //   "Status": advert.Status.toString(),
    //   "AttendeeIDs": {
    //     userId : username.toString()
    //   },
    //   "FilmID": advert.FilmID.toString(),
    //   "AdvertID": advert.AdvertID.toString(),
    //   "OwnerUsername": advert.OwnerUsername.toString(),
    //   "OwnerID": advert.OwnerID.toString(),
    //   "Quota": 2,
    //   "PendingRequests": advert.PendingRequests,
    // })

    console.log(advert.AdvertID, userId, username);
    axios.put('https://wlobby-backend.herokuapp.com/accept/user/?AdvertID=' + advert.AdvertID + "&UserID=" + userId)
        .then((response) => {
          console.log(response.data);
      if(response.data.Status === "Success") {
        alert("Nice! You will watch this movie with " + username + "!");
      }
      else {
        alert("An error occured");
      }
      setShowButton(false);
    })
  }

  function rejectUser(userId, username) {
    axios.put('https://wlobby-backend.herokuapp.com/reject/user/?AdvertID=' + advert.AdvertID + "&UserID=" + userId)
        .then((response) => {
          console.log(response.data);
          if(response.data.Status === "Success") {
            alert("Oh! You rejected " + username + " from your party :(");
          }
          else {
            alert("An error occured");
          }
          setShowButton(false);
        })
  }

  const renderLeftActions = (props, userId, username) => {
    return (
        <View style={{flexDirection: 'row'}}>
          {
            isMyAdvert === 0 ?
                <TouchableOpacity>
                  <IconButton icon="delete" style={{backgroundColor: 'red'}}
                              onPress={() => deleteAdvert()}/>
                </TouchableOpacity> : isMyAdvert === 1 && pendingStatus !== "Approved" ?
                    <TouchableOpacity>
                      <IconButton icon="delete" style={{backgroundColor: 'red'}}
                                  onPress={() => rejectUser(userId,username)}/>
                    </TouchableOpacity> : null
          }
          {
            isMyAdvert === 2 ? <>
                  <TouchableOpacity>
                    <IconButton icon="check-circle-outline" style={{backgroundColor: 'green'}}
                                onPress={() => acceptUser(userId, username)}/>

                  </TouchableOpacity>
                  <TouchableOpacity>
                    <IconButton icon="alpha-x-circle-outline" style={{backgroundColor: 'red'}}
                                onPress={() => getSubTitle(userId, username)}/>

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

  function function2(userID) {
    navigation.navigate("Profile", {userID});
  }

  const [subTitle, setSubTitle] = React.useState("");

  useEffect(() => {
    getSubTitle();
  })
  function getSubTitle() {
    axios.get('https://wlobby-backend.herokuapp.com/get/user/?UserID=' + advert.OwnerID)
        .then(res => {
          console.log("here",res.data.Item.Username);
          setSubTitle(res.data.Item.Username);
          return res.data.Item.Username;
        })
    return subTitle;
  }

  return (
      <>
        {
          showButton
              ? Object.keys(pendingUsers).length !== 0 && isMyAdvert === 2
                  ? Object.entries(pendingUsers).map(([userId, username]) => {
                    return (
                        <View>
                          <TouchableOpacity onPress={() => function2(userId)}>
                            <Card.Title style={{borderWidth: .5, borderColor: "black"}}
                                        title={username}
                                        subtitle={isLoading ? "Loading..." : movieInfo.original_title}
                                        left={(props) => handleLeft(props)}
                                        right={(props) => renderLeftActions(props, userId, username)}
                            />
                          </TouchableOpacity>
                        </View>
                        );
                  })
                  : isMyAdvert === 0 ?
                      <TouchableOpacity onPress={() => function1()}>
                        <Card.Title style={{borderWidth: .5, borderColor: "black"}}
                                    title={isLoading ? "Loading..." : movieInfo.original_title}
                                    subtitle={subTitle}
                                    left={(props) => handleLeft(props)}
                                    right={(props) => renderLeftActions(props)}
                        />
                      </TouchableOpacity>
                      : isMyAdvert === 1
                          ? advert.OwnerID !== state.userID ?
                              <TouchableOpacity onPress={() => function1()}>
                                <Card.Title style={{borderWidth: .5, borderColor: "black"}}
                                            title={isLoading ? "Loading..." : movieInfo.original_title}
                                            subtitle={getSubTitle()}
                                            left={(props) => handleLeft(props)}
                                            right={(props) => renderLeftActions(props)}
                                />
                              </TouchableOpacity>
                              : null
                          :
                          <TouchableOpacity onPress={() => function1()}>
                            <Card.Title style={{borderWidth: .5, borderColor: "black"}}
                                        title={isLoading ? "Loading..." : movieInfo.original_title}
                                        subtitle={getSubTitle()}
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
