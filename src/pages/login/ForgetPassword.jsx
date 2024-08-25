import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import PhoneLogo from '../../assets/svg/phone.svg';

function ForgetPassword() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handelForget = async () => {
    try {
      const response = await axios.post(
        'https://sowlab.com/assignment/user/forget-password',
        {mobile: phoneNumber},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const result = response.data;

      if (result.success === 'true') {
        Alert.alert('Success', result.message);
        navigation.navigate('VerifyOTP');
      } else {
        Alert.alert('Failed', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>FarmerEats</Text>
        <Text style={styles.message}>Forgot Password?</Text>
        <View style={styles.newRegister}>
          <Text style={{color: 'grey'}}>Remember your password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#D5715B'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#EEEDEC',
            height: 58,
            borderRadius: 8,
            paddingHorizontal: 10,
            marginVertical: 10,
          }}>
          <PhoneLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            placeholder="Phone Number"
            placeholderTextColor={'#0000004D'}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.inputBox,
            {
              borderRadius: 50,
              backgroundColor: '#D5715B',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          onPress={handelForget}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontFamily: 'Be Vietnam',
              fontSize: 18,
              lineHeight: 26.3,
            }}>
            Send Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('VerifyOTP')}>
          <Text
            style={{
              color: 'grey',
              fontWeight: '400',
              fontFamily: 'Be Vietnam',
              fontSize: 14,
              lineHeight: 26.3,
              textDecorationLine: 'underline',
              marginVertical: 40,
            }}>
            Test Route - Navigate to Verify OTP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginLeft: 30,
  },
  title: {
    fontFamily: 'Be Vietnam',
    marginTop: 36,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 23.38,
    color: '#000',
  },
  message: {
    fontFamily: 'Be Vietnam',
    marginTop: 98,
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 46.75,
    color: '#261C12',
  },
  newRegister: {
    flexDirection: 'row',
    fontFamily: 'Be Vietnam',
    marginTop: 20,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20.45,
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: 310,
    width: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  inputBox: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEEDEC',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  login: {
    marginVertical: 15,
    width: '80%',
    height: 52,
    backgroundColor: '#D5715B',
    borderRadius: 50,
  },
  authIcons: {
    display: 'flex',
    position: 'absolute',
    top: 595,
    width: '100%',

    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingHorizontal: 30,
    // backgroundColor: 'blue',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  icon: {
    width: 96,
    height: 52,
    borderRadius: 50,
    borderColor: '#00000033',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgetPassword;
