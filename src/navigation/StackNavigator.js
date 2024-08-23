import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../pages/Onboarding';
import Login from '../pages/login/Login';
import ForgetPassword from '../pages/login/ForgetPassword';
import VerifyOTP from '../pages/login/VerifyOTP';
import ResetPassword from '../pages/login/ResetPassword';
import Welcome from '../pages/signup/welcome';
import FarmInfo from '../pages/signup/FarmInfo';
import Verification from '../pages/signup/Verification';
import Confirmation from '../pages/signup/Confirmation';
import BusinessHours from '../pages/signup/BusinessHours';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
        }}
      />
      {/* login routes */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="VerifyOTP"
        component={VerifyOTP}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
      {/* signup routes */}
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FarmInfo"
        component={FarmInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BusinessHours"
        component={BusinessHours}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
