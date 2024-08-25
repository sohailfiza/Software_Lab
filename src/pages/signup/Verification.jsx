import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowLeftLogo from '../../assets/svg/arrowLeft.svg';
import {useNavigation} from '@react-navigation/native';
import CameraLogo from '../../assets/svg/camera.svg';
import CloseLogo from '../../assets/svg/close.svg';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Verification() {
  const navigation = useNavigation();
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadFileOnPressHandler = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });

      const localFilePath = `${RNFS.DocumentDirectoryPath}/${pickedFile.name}`;
      const fileContent = await RNFS.readFile(pickedFile.uri, 'base64');
      await RNFS.writeFile(localFilePath, fileContent, 'base64');

      setSelectedFile(pickedFile);

      const existingData = await AsyncStorage.getItem('newUserData');
      const jsonValue = existingData != null ? JSON.parse(existingData) : {};

      const updatedData = {
        ...jsonValue,
        registration_proof: pickedFile.name,
      };

      await AsyncStorage.setItem('newUserData', JSON.stringify(updatedData));
      console.log('File saved to', localFilePath);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker', err);
      } else {
        console.log('Error in file picker', err);
        throw err;
      }
    }
  };

  const handleContinue = () => {
    if (!selectedFile) {
      Alert.alert('Validation Error', 'Please attach a proof of registration.');
      return;
    }
    navigation.navigate('BusinessHours');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={[styles.title, {marginHorizontal: 30}]}>FarmerEats</Text>
        <Text style={[styles.subtitle, {marginHorizontal: 30}]}>
          Signup 3 of 4
        </Text>
        <Text style={[styles.message, {marginHorizontal: 30}]}>
          Verification
        </Text>
        <Text style={[styles.description, {marginHorizontal: 30}]}>
          Attach proof of Department of Agriculture registrations i.e. Florida
          Fresh, USDA Approved, USDA Organic
        </Text>
      </View>
      <View style={styles.form}>
        <View style={styles.proofContainer}>
          <Text style={[styles.proofText, {marginHorizontal: 30}]}>
            Attach proof of registration
          </Text>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={uploadFileOnPressHandler}>
            <CameraLogo />
          </TouchableOpacity>
        </View>
        {selectedFile && (
          <View
            style={{
              width: '90%',
              height: 48,
              backgroundColor: '#0000001A',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 8,
              marginVertical: 20,
              flexDirection: 'row',
              paddingHorizontal: 15,
            }}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '400',
                fontFamily: 'Be Vietnam',
                lineHeight: 20.45,
                textDecorationLine: 'underline',
              }}>
              {selectedFile.name}
            </Text>
            <CloseLogo />
          </View>
        )}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FarmInfo')}
            style={styles.backButton}>
            <ArrowLeftLogo />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleContinue}
            style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
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
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: 202,
    width: '100%',
  },
  proofContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    marginTop: 80,
    // backgroundColor: 'red',
  },
  proofText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Be Vietnam',
    lineHeight: 20.45,
    marginTop: 20,
  },
  cameraButton: {
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#D5715B',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  navigationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 25,
    top: 550,
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
    height: 52,
  },
  continueText: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'Be Vietnam',
    fontSize: 18,
    lineHeight: 26.3,
  },
});

export default Verification;
