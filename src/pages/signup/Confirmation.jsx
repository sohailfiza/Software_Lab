import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DoneTickLogo from '../../assets/svg/doneTick.svg';

function ForgetPassword() {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 250,
          width: '100%',
          marginTop: 200,
          alignItems: 'center',
          // backgroundColor: 'red',
        }}>
        <DoneTickLogo />
        <Text style={styles.doneText}>You’re all done!</Text>
        <Text style={styles.messageText}>
          Hang tight! We are currently reviewing your account and
        </Text>
        <Text style={styles.messageText}>
          will follow up with you in 2-3 business days. In the
        </Text>
        <Text style={styles.messageText}>
          meantime, you can setup your inventory.
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Got it!</Text>
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
  button: {
    backgroundColor: 'blue',
    width: 340,
    height: 52,
    borderRadius: 50,
    backgroundColor: '#D5715B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  doneText: {
    color: 'black',
    fontWeight: '700',
    fontFamily: 'Be Vietnam',
    fontSize: 32,
    lineHeight: 46.75,
    marginVertical: 40,
  },
  messageText: {
    color: 'grey',
    fontWeight: '400',
    fontFamily: 'Be Vietnam',
    fontSize: 12,
    lineHeight: 17.53,
    marginHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'Be Vietnam',
    fontSize: 18,
    lineHeight: 26.3,
  },
});

export default ForgetPassword;
