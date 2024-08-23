import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import TagLogo from '../../assets/svg/tag.svg';
import SmileLogo from '../../assets/svg/smile.svg';
import HomeLogo from '../../assets/svg/home.svg';
import LocationPinLogo from '../../assets/svg/locationPin.svg';
import DownArrowLogo from '../../assets/svg/downArrow.svg';
import ArrowLeftLogo from '../../assets/svg/arrowLeft.svg';
import {useNavigation} from '@react-navigation/native';

function FarmInfo() {
  const navigation = useNavigation();

  const [businessName, setBusinessName] = useState('');
  const [informalName, setInformalName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={[styles.title, {marginLeft: 30}]}>FarmerEats</Text>
        <Text
          style={{
            color: 'grey',
            marginLeft: 30,
            fontSize: 14,
            fontWeight: '500',
            fontFamily: 'Be Vietnam',
            lineHeight: 20.45,
            marginTop: 40,
          }}>
          Signup 2 of 4
        </Text>
        <Text style={[styles.message, {marginLeft: 30}]}>Farm Info</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputBoxContainer}>
          <TagLogo />
          <TextInput
            style={styles.inputBox}
            placeholder="Business Name"
            onChangeText={setBusinessName}
            value={businessName}
            placeholderTextColor={'#0000004D'}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <SmileLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setInformalName}
            value={informalName}
            placeholder="Informal Name"
            placeholderTextColor={'#0000004D'}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <HomeLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setAddress}
            value={address}
            placeholder="Street Address"
            placeholderTextColor={'#0000004D'}
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <LocationPinLogo />
          <TextInput
            style={styles.inputBox}
            value={city}
            onChangeText={setCity}
            placeholder="City"
            placeholderTextColor={'#0000004D'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 30,
            width: '100%',
            justifyContent: 'space-around',
            // backgroundColor: 'red',
          }}>
          <View
            style={[styles.inputBoxContainer, {width: '35%', marginLeft: 15}]}>
            <TextInput
              style={styles.inputBox}
              onChangeText={setState}
              value={state}
              placeholder="State"
              placeholderTextColor={'#0000004D'}
            />
            <DownArrowLogo />
          </View>
          <View
            style={[styles.inputBoxContainer, {width: '52%', marginRight: 15}]}>
            <TextInput
              style={styles.inputBox}
              onChangeText={setPinCode}
              value={pinCode}
              placeholder="Enter Zipcode"
              placeholderTextColor={'#0000004D'}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignContent: 'center',
            paddingHorizontal: 25,
            marginTop: 15,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Welcome')}
            style={{
              alignItems: 'center',
              justifyContent: 'center',

              //   backgroundColor: 'blue',
            }}>
            <ArrowLeftLogo />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Verification')}
            style={[
              styles.button,
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
              Continue
            </Text>
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
  message: {
    fontFamily: 'Be Vietnam',
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
    top: 202,
    width: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEEDEC',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  button: {
    width: '65%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EEEDEC',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 200,
  },
  authIcons: {
    display: 'flex',
    position: 'absolute',
    top: 200,
    width: '100%',
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default FarmInfo;
