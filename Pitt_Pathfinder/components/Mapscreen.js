import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';

import Geolocation, { requestAuthorization } from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";
import Openrouteservice from "openrouteservice-js";

export default class Mapscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'region':null,
            'lookupRegion':null,
            'factor': 10,
            'input':'',
            'searchResults':null,
            'destination':null
        };
    }

    componentDidMount() {
        Geolocation.requestAuthorization('whenInUse');
        let _watchId = Geolocation.watchPosition(
            (position) => {
                let currentRegion = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                };
                let currentLookupRegion = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2
                };
                this.setState({
                    region: currentRegion,
                    lookupRegion: currentLookupRegion
                });
            },
            (error) => {
                console.log(error.code, error.message); // TODO : navigate to error screen
            },
            {
                enabledHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000    
            }
        );
    }

    toggleLower = () => {
        this.setState({ factor: 2 });
    }

    submitInput = () => {
        RNReverseGeocode.searchForLocations(
            this.state.input,
            this.state.lookupRegion,
            (err, res) => {
                this.setState({
                    searchResults: res
                });
                // TODO : Handle errors
            }
        );
    }

    setDestination = (itemName, itemAddress, itemLocation) => {
        this.setState({
            destination: {
                'name':itemName,
                'address': itemAddress,
                'location':itemLocation
            }
        });

        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ this.state.destination.location }&destination=${ this.state.destination.location}`)
    }

    render() {
        return (
            <KeyboardAvoidingView style={ styles.container }>
                <MapView
                    style={ styles.map }
                    initialRegion={ this.state.region }
                    followUserLocation={true}
                    showsUserLocation={true}
                    region={this.state.region}
                />
                <View style={[styles.lower, { height: Dimensions.get('window').height / this.state.factor } ]}>
                    <SearchBar
                        onFocus={this.toggleLower}
                        iconStyle={{backgroundColor:'#FFFFFF'}}
                        inputContainerStyle={{backgroundColor: '#FFFFFF', borderColor:'#FFFFFF'}}
                        containerStyle={{ backgroundColor: '#FFFFFF'  }}
                        style={styles.input}
                        onChangeText={ (text) => this.setState({ input: text }) }
                        value={ this.state.input }
                        onSubmitEditing={ this.submitInput }
                    />
                    <FlatList
                        data={this.state.searchResults}
                        // start here!
                        renderItem={({item}) => <TouchableOpacity onPress={() => this.setDestination(item.name, item.address, item.location)}><View style={styles.listItem}><Text style={styles.boldItem}>{item.name}</Text><Text style={styles.smallItem}>{item.address}</Text></View></TouchableOpacity>}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    lower: {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
    },
    listItem: {
        backgroundColor: '#FFFFFF',
        padding: '5%',
        borderBottomColor: 'black'
    },
    boldItem: {
        fontSize: 18
    },
    smallItem: {
        fontSize: 14
    }
});