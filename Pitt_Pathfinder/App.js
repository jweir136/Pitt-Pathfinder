import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Mapscreen from './components/Mapscreen';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;