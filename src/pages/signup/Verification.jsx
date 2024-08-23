import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowLeftLogo from '../../assets/svg/arrowLeft.svg';
import {useNavigation} from '@react-navigation/native';
import CameraLogo from '../../assets/svg/camera.svg';

function Verification() {
  const navigation = useNavigation();

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
          Signup 3 of 4
        </Text>
        <Text style={[styles.message, {marginLeft: 30}]}>Verification</Text>
        <Text
          style={[
            {
              // backgroundColor: 'red',
              color: 'grey',
              marginLeft: 30,
              fontSize: 14,
              fontWeight: '500',
              fontFamily: 'Be Vietnam',
              lineHeight: 20.45,
              marginTop: 30,
              height: 80,
            },
          ]}>
          Attached proof of Department of Agriculture registrations i.e. Florida
          Fresh, USDA Approved, USDA Organic
        </Text>
      </View>
      <View style={styles.form}>
        <View
          style={{
            // backgroundColor: 'grey',
            flexDirection: 'row',
            width: '100%',
            height: 60,
            justifyContent: 'space-between',
            marginTop: 80,
          }}>
          <Text
            style={[
              {
                color: 'black',
                marginLeft: 30,
                fontSize: 14,
                fontWeight: '500',
                fontFamily: 'Be Vietnam',
                lineHeight: 20.45,
                marginTop: 30,
              },
            ]}>
            Attach proof of registration
          </Text>
          <TouchableOpacity
            style={{
              width: 55,
              height: 55,
              borderRadius: 50,
              backgroundColor: '#D5715B',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 30,
            }}>
            <CameraLogo />
          </TouchableOpacity>
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
            onPress={() => navigation.navigate('FarmInfo')}
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
    marginVertical: 400,
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

export default Verification;
