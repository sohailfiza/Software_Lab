import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import GoogleLogo from '../../assets/svg/google.svg';
import AppleLogo from '../../assets/svg/apple.svg';
import FacebookLogo from '../../assets/svg/facebook.svg';
import AtTheRateLogo from '../../assets/svg/atTheRate.svg';
import PasswordLogo from '../../assets/svg/password.svg';
import PeopleLogo from '../../assets/svg/people.svg';
import PhoneLogo from '../../assets/svg/phone.svg';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Welcome() {
  const saveData = async () => {
    try {
      await AsyncStorage.setItem(
        'newUserData',
        JSON.stringify({
          full_name: name,
          email,
          phone: number,
          password,
          business_name: null,
          informal_name: null,
          address: null,
          city: null,
          state: null,
          zip_code: null,
          registration_hours: null,
          business_hours: null,
          device_token: null,
          type: 'email/facebook/google/apple',
          social_id: null,
        }),
      );
      console.log('Data successfully saved');
    } catch (e) {
      console.log('Failed to save data:', e);
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        setName(data.name);
        setEmail(data.email);
        setNumber(data.number);
        setPassword(data.password);
        setConfirmPassword(data.confirmPassword);
        console.log('Data loaded');
      }
    } catch (e) {
      console.log('Failed to load data:', e);
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = number => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(number);
  };

  const validatePassword = password => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const validation = () => {
    if (!name.trim()) {
      Alert.alert('Please check', 'Name is required');
      console.log('Name is required');
      return false;
    }
    if (!validateEmail(email)) {
      Alert.alert('Please check', 'Invalid email format');
      console.log('Invalid email format');
      return false;
    }
    if (!validatePhoneNumber(number)) {
      Alert.alert('Please check', 'Phone number should be 10 digits');
      console.log('Phone number should be 10 digits');
      return false;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Please check',
        'Password should be at least 8 characters long, contain uppercase, lowercase, number, and special character',
      );
      console.log(
        'Password should be at least 8 characters long, contain uppercase, lowercase, number, and special character',
      );
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Please check', 'Passwords do not match');
      console.log('Passwords do not match');
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={[styles.title, styles.marginLeft30]}>FarmerEats</Text>
        <Text style={[styles.subTitle, styles.marginLeft30]}>
          Signup 1 of 4
        </Text>
        <Text style={[styles.message, styles.marginLeft30]}>Welcome!</Text>

        <View style={styles.authIcons}>
          <TouchableOpacity style={styles.icon}>
            <GoogleLogo />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <AppleLogo />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <FacebookLogo />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.orSignupText}>or signup with</Text>
      <View style={styles.form}>
        <View style={styles.inputBoxContainer}>
          <PeopleLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setName}
            value={name}
            placeholder="Full Name"
            placeholderTextColor="#0000004D"
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <AtTheRateLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setEmail}
            value={email}
            placeholder="Email Address"
            placeholderTextColor="#0000004D"
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <PhoneLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setNumber}
            value={number}
            placeholder="Phone Number"
            placeholderTextColor="#0000004D"
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <PasswordLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            placeholderTextColor="#0000004D"
            secureTextEntry
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <PasswordLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Re-Enter Password"
            placeholderTextColor="#0000004D"
            secureTextEntry
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (validation()) {
                saveData();
                navigation.navigate('FarmInfo');
              }
            }}
            style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
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
  },
  title: {
    fontFamily: 'Be Vietnam',
    marginTop: 36,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 23.38,
    color: '#000',
  },
  subTitle: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Be Vietnam',
    lineHeight: 20.45,
    marginTop: 40,
  },
  message: {
    fontFamily: 'Be Vietnam',
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 46.75,
    color: '#261C12',
  },
  authIcons: {
    position: 'absolute',
    top: 200,
    width: '100%',
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  orSignupText: {
    marginTop: 105,
    zIndex: 10,
  },
  form: {
    alignItems: 'center',
    position: 'absolute',
    top: 310,
    width: '100%',
  },
  inputBoxContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEDEC',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  inputBox: {
    width: '90%',
    backgroundColor: '#EEEDEC',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 105,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#000',
    textDecorationLine: 'underline',
    fontFamily: 'Be Vietnam',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20.45,
    paddingLeft: 5,
  },
  continueButton: {
    borderRadius: 50,
    backgroundColor: '#D5715B',
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    height: 48,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'Be Vietnam',
    fontSize: 18,
    lineHeight: 26.3,
  },
  marginLeft30: {
    marginLeft: 30,
  },
});

export default Welcome;
