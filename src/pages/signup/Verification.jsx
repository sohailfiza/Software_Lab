import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ArrowLeftLogo from '../../assets/svg/arrowLeft.svg';
import {useNavigation} from '@react-navigation/native';
import CameraLogo from '../../assets/svg/camera.svg';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

function Verification() {
  const navigation = useNavigation();

  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const fileSize = await RNFS.stat(result.uri);
      const maxSize = 5 * 1024 * 1024; // 5 MB in bytes

      if (fileSize.size > maxSize) {
        Alert.alert(
          'File Size Limit Exceeded',
          'Please select a file up to 5 MB.',
        );
      } else {
        setSelectedFile(result);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
      } else {
        throw err;
      }
    }
  };

  const uploadFile = () => {
    if (selectedFile) {
      // File upload logic goes here
      Alert.alert(
        'File Uploaded',
        `File ${selectedFile.name} has been uploaded successfully.`,
      );
    } else {
      Alert.alert('No File Selected', 'Please select a file to upload.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={[styles.title, styles.marginLeft30]}>FarmerEats</Text>
        <Text style={[styles.subtitle, styles.marginLeft30]}>
          Signup 3 of 4
        </Text>
        <Text style={[styles.message, styles.marginLeft30]}>Verification</Text>
        <Text style={[styles.description, styles.marginLeft30]}>
          Attach proof of Department of Agriculture registrations i.e. Florida
          Fresh, USDA Approved, USDA Organic
        </Text>
      </View>
      <View style={styles.form}>
        <View style={styles.proofContainer}>
          <Text style={[styles.proofText, styles.marginLeft30]}>
            Attach proof of registration
          </Text>
          <TouchableOpacity style={styles.cameraButton}>
            <CameraLogo />
          </TouchableOpacity>
        </View>
        <View>
          <Button title="Pick Document" onPress={pickDocument} />
          {selectedFile && <Text>Selected File: {selectedFile.name}</Text>}
          <Button title="Upload File" onPress={uploadFile} />
        </View>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('FarmInfo')}
            style={styles.backButton}>
            <ArrowLeftLogo />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('BusinessHours')}
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
  },
  proofText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Be Vietnam',
    lineHeight: 20.45,
    marginTop: 30,
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
