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
import TagLogo from '../../assets/svg/tag.svg';
import SmileLogo from '../../assets/svg/smile.svg';
import HomeLogo from '../../assets/svg/home.svg';
import LocationPinLogo from '../../assets/svg/locationPin.svg';
import DownArrowLogo from '../../assets/svg/downArrow.svg';
import ArrowLeftLogo from '../../assets/svg/arrowLeft.svg';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FarmInfo() {
  const navigation = useNavigation();

  const saveFarmInfo = async () => {
    if (
      !businessName ||
      !informalName ||
      !address ||
      !city ||
      !state ||
      !pinCode
    ) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    try {
      const existingData = await AsyncStorage.getItem('newUserData');
      const jsonValue = existingData != null ? JSON.parse(existingData) : {};

      const updatedData = {
        ...jsonValue,
        business_name: businessName,
        informal_name: informalName,
        address,
        city,
        state,
        zip_code: pinCode,
      };

      await AsyncStorage.setItem('newUserData', JSON.stringify(updatedData));
      console.log('Farm Info successfully saved');
    } catch (e) {
      console.log('Failed to save farm info:', e);
    }
  };

  const [businessName, setBusinessName] = useState('');
  const [informalName, setInformalName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.title}>FarmerEats</Text>
        <Text style={styles.subTitle}>Signup 2 of 4</Text>
        <Text style={styles.message}>Farm Info</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputBoxContainer}>
          <TagLogo />
          <TextInput
            style={styles.inputBox}
            placeholder="Business Name"
            onChangeText={setBusinessName}
            value={businessName}
            placeholderTextColor="#0000004D"
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <SmileLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setInformalName}
            value={informalName}
            placeholder="Informal Name"
            placeholderTextColor="#0000004D"
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <HomeLogo />
          <TextInput
            style={styles.inputBox}
            onChangeText={setAddress}
            value={address}
            placeholder="Street Address"
            placeholderTextColor="#0000004D"
          />
        </View>
        <View style={styles.inputBoxContainer}>
          <LocationPinLogo />
          <TextInput
            style={styles.inputBox}
            value={city}
            onChangeText={setCity}
            placeholder="City"
            placeholderTextColor="#0000004D"
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.inputBoxContainer, styles.stateBox]}>
            <TextInput
              style={styles.inputBox}
              onChangeText={setState}
              value={state}
              placeholder="State"
              placeholderTextColor="#0000004D"
            />
            <DownArrowLogo />
          </View>
          <View style={[styles.inputBoxContainer, styles.zipCodeBox]}>
            <TextInput
              style={styles.inputBox}
              onChangeText={setPinCode}
              value={pinCode}
              placeholder="Enter Zipcode"
              placeholderTextColor="#0000004D"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Welcome')}
            style={styles.backButton}>
            <ArrowLeftLogo />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              saveFarmInfo();
              if (
                businessName &&
                informalName &&
                address &&
                city &&
                state &&
                pinCode
              ) {
                navigation.navigate('Verification');
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
    paddingHorizontal: 30,
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
  form: {
    alignItems: 'center',
    position: 'absolute',
    top: 202,
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
  },
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: 30,
    width: '100%',
    justifyContent: 'space-around',
  },
  stateBox: {
    width: '35%',
    marginLeft: 15,
  },
  zipCodeBox: {
    width: '52%',
    marginRight: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: 210,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default FarmInfo;
