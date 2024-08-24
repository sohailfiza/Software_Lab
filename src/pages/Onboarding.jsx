import React, {useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    title: 'Quality',
    textOne: 'Sell your farm fresh products directly to',
    textTwo: 'consumers, cutting out the middleman and',
    textThree: 'reducing emissions of the global supply chain.',
    image: 'https://i.postimg.cc/SsNzn25t/Onboarding-1.png',
    color: '#5EA25F',
  },
  {
    title: 'Convenient',
    textOne: 'Our team of delivery drivers will make sure',
    textTwo: 'your orders are picked up on time and',
    textThree: 'and promptly delivered to your customers.',
    image: 'https://i.postimg.cc/kX8F38dx/Onboarding-2.png',
    color: '#D5715B',
  },
  {
    title: 'Local',
    textOne: 'We love the earth and know you do too! Join us',
    textTwo: 'in reducing our local carbon footprint one order',
    textThree: 'at a time.',
    image: 'https://i.postimg.cc/7LPg2WJV/Onboarding-3.png',
    color: '#F8C569',
  },
];

const Onboarding = () => {
  const navigation = useNavigation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width: windowWidth} = useWindowDimensions();

  const backgroundColor = scrollX.interpolate({
    inputRange: data.map((_, index) => index * windowWidth),
    outputRange: data.map(item => item.color),
  });

  const buttonColor = scrollX.interpolate({
    inputRange: data.map((_, index) => index * windowWidth),
    outputRange: data.map(item => item.color),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.scrollContainer, {backgroundColor}]}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={1}>
          {data.map(
            ({title, textOne, textTwo, textThree, image}, imageIndex) => (
              <View
                style={[styles.slide, {width: windowWidth}]}
                key={imageIndex}>
                <ImageBackground
                  source={{uri: image}}
                  style={styles.card}></ImageBackground>
                <View style={styles.textContainer}>
                  <Text style={styles.heading}>{title}</Text>
                  <Text style={styles.text}>{textOne}</Text>
                  <Text style={styles.text}>{textTwo}</Text>
                  <Text style={styles.text}>{textThree}</Text>
                </View>
              </View>
            ),
          )}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {data.map((_, imageIndex) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={imageIndex}
                style={[styles.normalDot, {width}]}
              />
            );
          })}
        </View>
      </Animated.View>
      <View style={styles.content}>
        <Animated.View
          style={[styles.signUpButton, {backgroundColor: buttonColor}]}>
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
            <Text style={styles.signUpButtonText}>Join the movement!</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollContainer: {
    width: '100%',
    height: 800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    height: 400,
  },
  card: {
    flex: 1,
    marginVertical: 4,
    borderRadius: 5,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  textContainer: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    top: 410,
    width: '100%',
    height: 260,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  heading: {
    margin: 20,
    marginBottom: 5,
    color: 'black',
    fontFamily: 'Be Vietnam',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 35.06,
    textAlign: 'center',
    paddingBottom: 40,
    paddingTop: 10,
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    lineHeight: 20.45,
    paddingHorizontal: 30,
  },
  normalDot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    marginBottom: 100,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: 600,
    zIndex: 1,
    // backgroundColor: 'red',
  },
  content: {
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    width: '100%',
    height: 200,
    top: 680,
  },
  signUpButton: {
    width: 236,
    height: 60,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#FFFFFF',
  },
  loginText: {
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontFamily: 'Be Vietnam',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Onboarding;
