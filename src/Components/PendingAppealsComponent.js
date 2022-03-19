import React, {Component} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {SafeAreaView} from "react-navigation";
import tmdb from "../api/tmdb";
import {Avatar, Button, Card, Paragraph, Title} from "react-native-paper";
import {Icon} from "react-native-elements";
import Swipeable from 'react-native-gesture-handler/Swipeable';

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

  render() {
    const {showButton} = this.state;
    return (
        <>
          {
            showButton ?
                <SafeAreaView>
                  <Swipeable renderLeftActions={this.renderLeftActions}>
                    <Card mode={'outlined'}
                          style={{backgroundColor: this.returnBackgroundColor(), marginVertical: 1}}>
                      <Card.Content>
                        <SafeAreaView style={{flexDirection: "row"}}>
                          <Avatar.Image style={{alignSelf: 'center'}} size={40}
                                        source={require('../../assets/profilePhoto.jpg')}/>
                          <SafeAreaView style={{marginLeft: 10}}>
                            <Pressable onPress={() => this.function1()}>
                              <Title>{this.props.filmName}</Title>
                            </Pressable>
                            <Paragraph>{this.props.ownerName}</Paragraph>
                          </SafeAreaView>
                          <SafeAreaView style={{
                            position: "absolute",
                            right: 0,
                            justifyContent: "center",
                            alignItems: "center",
                            alignSelf: "center"
                          }}>
                            <Icon name={this.returnIconType()} size={30} color="#000"/>
                            <Paragraph>{this.props.pendingStatus}</Paragraph>
                          </SafeAreaView>
                        </SafeAreaView>
                      </Card.Content>
                    </Card>
                  </Swipeable>
                </SafeAreaView>
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

