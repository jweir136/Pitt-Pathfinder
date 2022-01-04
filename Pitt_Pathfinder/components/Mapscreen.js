import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

import Geolocation, { requestAuthorization } from 'react-native-geolocation-service';

export default class Mapscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'lat':0,
            'lon':0
        };
    }

    componentDidMount() {
        Geolocation.requestAuthorization('whenInUse');
        let _watchId = Geolocation.watchPosition(
            (position) => {
                this.state['lat'] = position.coords.latitude;
                this.state['lon'] = position.coords.longitude;
                console.log(this.state);
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