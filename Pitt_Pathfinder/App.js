import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Mapscreen from './components/Mapscreen';
import Errorscreen from './components/Errorscreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
          name="Map"
          component={Mapscreen}
          options={{ title: 'Map' }}
        />
      <Stack.Screen
        name="Error"
        component={Errorscreen}
        options={{ title: "Error" }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;