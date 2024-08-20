import React from 'react';
// import Onboarding from './pages/Onboarding';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import {SafeAreaView, StyleSheet} from 'react-native';
// import {NavigationContainer, StackActions} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Onboarding from './pages/Onboarding';
// import Login from './pages/login/Login';
import StackNavigator from './navigation/StackNavigator';

// const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
