import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, Dimensions, KeyboardAvoidingView, TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';

import Geolocation, { requestAuthorization } from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import RNReverseGeocode from "@kiwicom/react-native-reverse-geocode";

export default class Mapscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'region':null,
            'lookupRegion':null
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

                console.log(this.state.lookupRegion);
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

    render() {
        return (
            <View style={ styles.container }>
                <MapView
                    style={ styles.map }
                    initialRegion={ this.state.region }
                    followUserLocation={true}
                    showsUserLocation={true}
                    region={this.state.region}
                />
                <View style={styles.lower}>
                    <SearchBar
                        placeholder="Type Here..."
                    />
                </View>
            </View>
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
            backgroundColor: "#FFFFFF",
            height: Dimensions.get('window').height / 10,
    },
});