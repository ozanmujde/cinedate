import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import tmdb from "../api/tmdb";
import {Avatar, Button, Card, IconButton, Snackbar} from "react-native-paper";

let result;
let uri;
export default class PendingAppealsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      showButton: true,
    };
  }

  function1 = async () => {
    try {
      const response = await tmdb.get("/search/movie", {
        params: {
          query: this.props.filmName,
        },
      });
      // console.log(response.data);
      result = response.data.results[0];
    } catch (err) {
      console.log("Something went wrong");
    }
    uri = "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + result.poster_path;
    this.props.navigation.navigate('ResultScreen', {id: result.id, image: uri, isDetailScreen: true});
  };

  returnBackgroundColor = () => {
    if (this.props.pendingStatus === "Pending") {
      return "#FFD700";
    } else if (this.props.pendingStatus === "Approved") {
      return "#71C562";
    } else if (this.props.pendingStatus === "Rejected") {
      return "#BE1F35";
    }
  }

  returnIconType = () => {
    if (this.props.pendingStatus === "Pending") {
      return "timer";
    } else if (this.props.pendingStatus === "Approved") {
      return "check-circle-outline";
    } else if (this.props.pendingStatus === "Rejected") {
      return "close";
    }
  }
  renderLeftActions = (progress, dragX) => {
    return (
        <Button icon="delete" style={{justifyContent: "center", backgroundColor: "#0080FF"}} mode="contained"
                onPress={() => this.toggleButton()}>
          Delete
        </Button>

    );
  };

  toggleButton = () => {
    this.setState({showButton: false});
  };

  handleLeft(props) {
    return (
        <TouchableOpacity onPress={() => this.setState({showSnackBar:true})}>
          <Avatar.Icon style={{backgroundColor: this.returnBackgroundColor()}}{...props} icon={this.returnIconType()}/>
        </TouchableOpacity>
    );
  }
  render() {
    const {showButton} = this.state;
    const {showSnackBar} = this.state;
    return (
        <>
          {
            showButton ?
                <View>
                  <Card.Title style={{borderWidth: .5, borderColor: "black"}}
                              title={this.props.filmName}
                              subtitle={this.props.ownerName}
                              left={(props) => this.handleLeft(props)}
                              right={(props) => <IconButton {...props} icon="dots-vertical-circle" onPress={() => {
                                this.renderLeftActions()
                              }}/>}
                  />
                </View>
                : null
          }
        </>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d9fe0'
  },
  separator: {
    flex: 1,
    borderWidth: 1,
  },
  label: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'System',
    color: '#966464',
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'System',
    color: 'rgba(0,0,255,0.58)',
    backgroundColor: 'transparent',
  },
  logo: {
    width: '100%',
    height: '20%',
  },
});

