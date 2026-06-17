/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// The stack navigator is now managed in AppNavigator.js
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppNavigator from './src/navigation/AppNavigator'; // Import the new navigator

// Placeholder for screens, these are now managed within AppNavigator
// import SplashScreen from './src/screens/SplashScreen';
// import AuthScreen from './src/screens/AuthScreen';
// import CustomerHomeScreen from './src/screens/CustomerHomeScreen';
// import DriverHomeScreen from './src/screens/DriverHomeScreen';

// const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
