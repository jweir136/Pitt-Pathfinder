import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Mapscreen from './components/Mapscreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Map"
          component={Mapscreen}
          options={{ title: 'Map' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;