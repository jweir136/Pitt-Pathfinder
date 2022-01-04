import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';

import Geolocation, { requestAuthorization } from 'react-native-geolocation-service';
import MapView from 'react-native-maps';

export default class Mapscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'region':null
        };
    }

    componentDidMount() {
        Geolocation.requestAuthorization('whenInUse');
        let _watchId = Geolocation.watchPosition(
            (position) => {
                let currentRegion = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0221
                };
                this.setState({
                    region: currentRegion
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1
    },
});