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
import GoogleLogo from '../../assets/svg/google.svg';
import AppleLogo from '../../assets/svg/apple.svg';
import FacebookLogo from '../../assets/svg/facebook.svg';
import AtTheRateLogo from '../../assets/svg/atTheRate.svg';
import PasswordLogo from '../../assets/svg/password.svg';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');
  const [profilePic, setProfilePic] = useState('');

  setTimeout(() => {
    navigation.navigate('Confirmation');
  }, 5000);

  const handleLogin = async () => {
    const loginDetails = {
      email,
      password,
      role: 'farmer',
      device_token: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
      type: 'email/facebook/google/apple',
      social_id: '0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx',
    };

    try {
      await AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));

      const response = await axios.post(
        'https://sowlab.com/assignment/user/login',
        loginDetails,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('response data:', response.data);

      if (response.data.success) {
        Alert.alert('Login Successful', response.data.message);
        navigation.navigate('Home');
      } else {
        switch (response.data.message) {
          case 'Email cannot be empty.':
            Alert.alert('Login Failed', 'Email cannot be empty.');
            break;
          case 'Password cannot be empty.':
            Alert.alert('Login Failed', 'Password cannot be empty.');
            break;
          case 'Invalid password.':
            Alert.alert('Login Failed', 'Invalid password.');
            break;
          case 'Server error while login.':
            Alert.alert('Login Failed', 'Server error while login.');
            break;
          case 'Role not matched.':
            Alert.alert('Login Failed', 'Role not matched.');
            break;
          case 'Type not matched.':
            Alert.alert('Login Failed', 'Type not matched.');
            break;
          case 'Account does not exist.':
            Alert.alert('Login Failed', 'Account does not exist.');
            break;
          case 'Social id not matched.':
            Alert.alert('Login Failed', 'Social id not matched.');
            break;
          case 'Social id cannot be empty.':
            Alert.alert('Login Failed', 'Social id cannot be empty.');
            break;
          case 'Account is not verified, please contact administrator.':
            Alert.alert(
              'Login Failed',
              'Account is not verified, please contact administrator.',
            );
            break;
          default:
            Alert.alert('Login Failed', 'An unknown error occurred.');
            break;
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to login. Please try again later.');
      console.error('Login error:', error);
    }
  };

  const handleGoogleLogin = () => {
    GoogleSignin.configure({
      androidClientId:
        '529098423777-r14991togjkfpjbiub9q2sri82o6jb42.apps.googleusercontent.com',
    });
    GoogleSignin.hasPlayServices()
      .then(hasPlayService => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then(userInfo => {
              Alert.alert('Logged in using Google Account');
              navigation.navigate('Confirmation');
              console.log(JSON.stringify(userInfo));
            })
            .catch(e => {
              console.log('ERROR IS: ' + JSON.stringify(e));
            });
        }
      })
      .catch(e => {
        console.log('ERROR IS: ' + JSON.stringify(e));
      });
  };

  const getResponseInfo = (error, result) => {
    if (error) {
      Alert.alert('Error fetching data', error.toString());
    } else {
      console.log(JSON.stringify(result));
      setUserName('Welcome ' + result.name);
      setToken('User Token: ' + result.id);
      setProfilePic(result.picture.data.url);
    }
  };

  // const onLogout = () => {
  //   setUserName('');
  //   setToken('');
  //   setProfilePic('');
  // };

  const handleFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(result => {
        if (result.isCancelled) {
          Alert.alert('Login Cancelled', 'User cancelled the login.');
        } else {
          AccessToken.getCurrentAccessToken()
            .then(data => {
              if (data) {
                console.log(data.accessToken.toString());
                const processRequest = new GraphRequest(
                  '/me?fields=name,picture.type(large)',
                  null,
                  getResponseInfo,
                );
                new GraphRequestManager().addRequest(processRequest).start();
              } else {
                Alert.alert(
                  'No Access Token',
                  'Failed to retrieve access token.',
                );
              }
            })
            .catch(error => {
              Alert.alert(
                'Error',
                'Error retrieving access token: ' + error.message,
              );
            });
        }
      })
      .catch(error => {
        Alert.alert(
          'Login Error',
          'Error during Facebook login: ' + error.message,
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>FarmerEats</Text>
        <Text style={styles.message}>Welcome back!</Text>
        <View style={styles.newRegister}>
          <Text style={{color: 'grey'}}>New here? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
            <Text style={{color: '#D5715B'}}>Create account</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <AtTheRateLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Email Address"
            placeholderTextColor={'#0000004D'}
          />
        </View>
        <View style={styles.inputContainer}>
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <Text>or login with</Text>
      </View>
      <View style={styles.authIcons}>
        <TouchableOpacity style={styles.icon} onPress={handleGoogleLogin}>
          <GoogleLogo />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <AppleLogo />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={handleFacebookLogin}>
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
  },
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEDEC',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
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
  loginButton: {
    borderRadius: 50,
    backgroundColor: '#D5715B',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 52,
    marginVertical: 15,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'Be Vietnam',
    fontSize: 18,
    lineHeight: 26.3,
  },
  authIcons: {
    display: 'flex',
    position: 'absolute',
    top: 595,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
