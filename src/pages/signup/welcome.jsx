import React, {useState} from 'react';
import {
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

function Welcome() {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
            onChangeText={setEmail}
            value={email}
            placeholder="Full Name"
            placeholderTextColor={'#0000004D'}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <AtTheRateLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setEmail}
            value={email}
            placeholder="Email Address"
            placeholderTextColor={'#0000004D'}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <PhoneLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setEmail}
            value={email}
            placeholder="Phone Number"
            placeholderTextColor={'#0000004D'}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <PasswordLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setEmail}
            value={email}
            placeholder="Password"
            placeholderTextColor={'#0000004D'}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <PasswordLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setEmail}
            value={email}
            placeholder="Re-Enter Password"
            placeholderTextColor={'#0000004D'}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FarmInfo')}
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
    display: 'flex',
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
    display: 'flex',
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
    alignContent: 'center',
    paddingHorizontal: 25,
    marginTop: 15,
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
