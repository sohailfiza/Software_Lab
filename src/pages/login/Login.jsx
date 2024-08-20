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
import {useNavigation} from '@react-navigation/native';

function Login() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>FarmerEats</Text>
        <Text style={styles.message}>Welcome back!</Text>
        <View style={styles.newRegister}>
          <Text style={{color: 'grey'}}>New here? </Text>
          <TouchableOpacity>
            <Text style={{color: '#D5715B'}}>Create account</Text>
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
            height: 48,
            borderRadius: 8,
            paddingHorizontal: 10,
            marginVertical: 10,
          }}>
          <AtTheRateLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setEmail}
            value={email}
            placeholder="Email Address"
            placeholderTextColor={'#0000004D'}
          />
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#EEEDEC',
            height: 48,
            borderRadius: 8,
            paddingHorizontal: 10,
            marginVertical: 10,
          }}>
          <PasswordLogo />
          <TextInput
            style={[styles.inputBox, {width: '80%'}]}
            value={password}
            placeholder="Password"
            placeholderTextColor={'#0000004D'}
            onChangeText={val => setPassword(val)}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgetPassword')}>
            <Text style={{color: '#D5715B'}}>Forgot?</Text>
          </TouchableOpacity>
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
          ]}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontFamily: 'Be Vietnam',
              fontSize: 18,
              lineHeight: 26.3,
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <Text>or login with</Text>
      </View>
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

export default Login;
