import React, {useState, useRef} from 'react';
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

function VerifyOTP() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join('');

    if (!otpValue) {
      Alert.alert('Error', 'OTP cannot be empty.');
      return;
    }

    try {
      const response = await axios.post(
        'https://sowlab.com/assignment/user/verify-otp',
        {otp: otpValue},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const result = response.data;

      if (result.success === 'true') {
        Alert.alert('Success', result.message);
        navigation.navigate('ResetPassword');
      } else {
        Alert.alert('Failed', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to verify OTP. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>FarmerEats</Text>
        <Text style={styles.message}>Verify OTP</Text>
        <View style={styles.newRegister}>
          <Text style={{color: 'grey'}}>Remember your password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#D5715B'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.otpContainer}>
          {otp.map((_, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.inputBox}
              value={otp[index]}
              onChangeText={text => handleChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              placeholderTextColor={'#0000004D'}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              borderRadius: 50,
              backgroundColor: '#D5715B',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          onPress={handleVerifyOtp}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontFamily: 'Be Vietnam',
              fontSize: 18,
              lineHeight: 26.3,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{
              fontStyle: 'Be Vietnam',
              fontWeight: '500',
              fontSize: 14,
              lineHeight: 20.45,
              textDecorationLine: 'underline',
              color: '#000',
            }}>
            Resend Code
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginVertical: 40}}
          onPress={() => navigation.navigate('ResetPassword')}>
          <Text
            style={{
              color: 'grey',
              fontWeight: '400',
              fontFamily: 'Be Vietnam',
              fontSize: 14,
              lineHeight: 26.3,
              textDecorationLine: 'underline',
            }}>
            Test Route - Navigate to Reset Password
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    maxWidth: 600,
  },
  inputBox: {
    width: 60,
    height: 60,
    textAlign: 'center',
    backgroundColor: '#EEEDEC',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  submitButton: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEEDEC',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 25,
  },
});

export default VerifyOTP;
