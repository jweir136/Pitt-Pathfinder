import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

import Geolocation, { requestAuthorization } from 'react-native-geolocation-service';

export default class Mapscreen extends Component {
    componentDidMount() {
        Geolocation.requestAuthorization('whenInUse');
        let _watchId = Geolocation.watchPosition(
            (position) => {
                console.log(position);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {
                enabledHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000    
            }
        );
    }

    render() {
        return <Text>Hello, World!</Text>
    }
}