import React, {useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import ArrowLeftLogo from '../../assets/svg/arrowLeft.svg';
import axios from 'axios';

function BusinessHours() {
  const navigation = useNavigation();
  const days = [
    {full: 'Monday', short: 'mon'},
    {full: 'Tuesday', short: 'tue'},
    {full: 'Wednesday', short: 'wed'},
    {full: 'Thursday', short: 'thu'},
    {full: 'Friday', short: 'fri'},
    {full: 'Saturday', short: 'sat'},
    {full: 'Sunday', short: 'sun'},
  ];

  const timings = [
    '8:00am - 10:00am',
    '10:00am - 1:00pm',
    '1:00pm - 4:00pm',
    '4:00pm - 7:00pm',
    '7:00pm - 10:00pm',
  ];

  const [selectedHours, setSelectedHours] = useState({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  });

  const handleSelectHour = useCallback((day, timing) => {
    setSelectedHours(prevState => {
      const isSelected = prevState[day].includes(timing);
      const updatedTimings = isSelected
        ? prevState[day].filter(t => t !== timing)
        : [...prevState[day], timing];

      return {
        ...prevState,
        [day]: updatedTimings,
      };
    });
  }, []);

  const handleContinue = async () => {
    try {
      const existingData = await AsyncStorage.getItem('newUserData');
      const userData = existingData ? JSON.parse(existingData) : {};
      const updatedData = {
        ...userData,
        business_hours: selectedHours,
      };

      const response = await axios.post(
        'https://sowlab.com/assignment/user/register',
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.success) {
        Alert.alert('Registration Successful', response.data.message);
        navigation.navigate('Confirmation');
      } else {
        switch (response.data.message) {
          case 'All fields are required.':
            Alert.alert('Registration Failed', 'All fields are required.');
            break;
          case 'Access denied! unauthorized user.':
            Alert.alert(
              'Registration Failed',
              'Access denied! Unauthorized user.',
            );
            break;
          case 'Server error while registering.':
            Alert.alert(
              'Registration Failed',
              'Server error while registering.',
            );
            break;
          case 'Email already exists.':
            Alert.alert('Registration Failed', 'Email already exists.');
            break;
          case 'Registration failed.':
            Alert.alert('Registration Failed', 'Registration failed.');
            break;
          case 'Invalid token.':
            Alert.alert('Registration Failed', 'Invalid token.');
            break;
          case 'Social id required.':
            Alert.alert('Registration Failed', 'Social ID required.');
            break;
          default:
            Alert.alert('Registration Failed', 'An unknown error occurred.');
            break;
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to register. Please try again later.');
      console.error('Registration error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={[styles.title, styles.marginLeft30]}>FarmerEats</Text>
        <Text style={[styles.subtitle, styles.marginLeft30]}>
          Signup 4 of 4
        </Text>
        <Text style={[styles.message, styles.marginLeft30]}>
          Business Hours
        </Text>
        <Text style={[styles.description, styles.marginLeft30]}>
          Choose the hours your farm is open for pickups. This will allow
          customers to order deliveries.
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.form}>
        {days.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day.full}</Text>
            <View style={styles.timingContainer}>
              {timings.map((timing, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.timingBox,
                    selectedHours[day.short].includes(timing)
                      ? styles.selectedTimingBox
                      : {},
                  ]}
                  onPress={() => handleSelectHour(day.short, timing)}>
                  <Text style={styles.timingText}>{timing}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <View style={styles.blankContainer} />
      </ScrollView>
      <View
        style={{
          width: '94%',
          height: 1,
          backgroundColor: '#00000033',
          position: 'absolute',
          top: 710,
          left: 15,
          zIndex: 999,
        }}
      />
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Verification')}
          style={styles.backButton}>
          <ArrowLeftLogo />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleContinue}
          style={styles.continueButton}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  marginLeft30: {
    marginLeft: 30,
  },
  subtitle: {
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
  description: {
    color: 'grey',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Be Vietnam',
    lineHeight: 20.45,
    marginTop: 30,
    height: 80,
  },
  form: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  timingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  timingBox: {
    width: '48%',
    height: 48,
    padding: 10,
    margin: 2,
    backgroundColor: '#EEEDEC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTimingBox: {
    backgroundColor: '#F8C569',
  },
  timingText: {
    color: '#000',
    fontSize: 14,
  },
  blankContainer: {
    height: 300,
    width: '100%',
  },
  navigationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 25,
    bottom: 0,
    backgroundColor: 'white',
    backgroundColor: '#FFFFFFE6',
    height: 200,
    zIndex: 99,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 85,
  },
  continueButton: {
    borderRadius: 50,
    backgroundColor: '#D5715B',
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    height: 52,
    alignSelf: 'center',
    marginBottom: 85,
  },
  continueText: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'Be Vietnam',
    fontSize: 18,
    lineHeight: 26.3,
  },
});

export default BusinessHours;
