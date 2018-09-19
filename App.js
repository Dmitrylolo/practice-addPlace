import React from "react";
import { StyleSheet, TextInput, View, Button, Text } from "react-native";

import PlaceList from "./src/components/PlaceList/PlaceList";
import PlaceInput from "./src/components/PlaceInput/PlaceInput";
import PlaceDetail from "./src/components/PlaceDetail/PlaceDetail";

export default class App extends React.Component {
  state = {
    places: [],
    selectedPlace: null
  };

  placeSelectedHandler = key => {
    this.setState(prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
          console.log(place);
          return place.key === key;
        })
      };
    }),
      () => console.log(this.state.selectedPlace);
  };

  placeAddedHandler = name => {
    this.setState(
      prevState => {
        return {
          places: prevState.places.concat({
            key: Math.random(),
            name,
            image: {
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYUajZ822kczuIKTL9vjGK0GA39r8OyVx2teJwEU2oty5ne7hJ"
            }
          })
        };
      },
      () => console.log(this.state.places)
    );
  };

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== prevState.selectedPlace.key;
        }),
        selectedPlace: null
      };
    });
  };

  modalCloseHandler = () => {
    this.setState({
      selectedPlace: null
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.selectedPlace}
          onItemDeleted={this.placeDeletedHandler}
          onModalClose={this.modalCloseHandler}
        />
        <PlaceInput onPlaceAdded={this.placeAddedHandler} />
        <PlaceList
          places={this.state.places}
          onItemSelected={this.placeSelectedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
