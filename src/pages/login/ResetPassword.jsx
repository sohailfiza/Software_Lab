import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import PasswordLogo from '../../assets/svg/password.svg';

function ResetPassword() {
  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password and confirm password do not match.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://sowlab.com/assignment/user/reset-password',
        {
          token: '895642',
          password,
          cpassword: confirmPassword,
        },
      );

      if (response.data.success === 'true') {
        Alert.alert('Success', response.data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>FarmerEats</Text>
        <Text style={styles.message}>Reset Password</Text>
        <View style={styles.registered}>
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
          <PasswordLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setPassword}
            value={password}
            placeholder="New Password"
            placeholderTextColor={'#0000004D'}
            secureTextEntry={true}
          />
        </View>

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
          <PasswordLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            placeholder="Confirm New Password"
            placeholderTextColor={'#0000004D'}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={isLoading}
          style={[
            styles.submitButton,
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
            {isLoading ? 'Submitting...' : 'Submit'}
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
  registered: {
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
  submitButton: {
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
});

export default ResetPassword;
