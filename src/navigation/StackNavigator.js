import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../pages/Onboarding';
import Login from '../pages/login/Login';
import ForgetPassword from '../pages/login/ForgetPassword';
import VerifyOTP from '../pages/login/VerifyOTP';
import ResetPassword from '../pages/login/ResetPassword';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
