import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {AuthStackProps} from '../utils/types';
import Animated from 'react-native-reanimated';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

GoogleSignin.configure({
  webClientId:
    '439331411954-0sihu46bdd7508j7shfi01f1853hatkj.apps.googleusercontent.com',
});

const Login = ({navigation}: AuthStackProps) => {
  const translateValue = useSharedValue(-500);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(translateValue.value, {
          duration: 1200,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          reduceMotion: ReduceMotion.System,
        }),
      },
    ],
  }));

  useEffect(() => {
    translateValue.value = 0;
  }, []);

  const HandleSignIn = () => {
    onGoogleButtonPress().then(res => {
      Alert.alert('Login Successfull');
      AsyncStorage.setItem('user', JSON.stringify(res));
      navigation.navigate('Home');
    });
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../assets/appbackground.png')}
        style={{height: '100%', width: '100%', position: 'absolute'}}
      />

      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={{height: 100, width: '100%'}}>
        <Text>Login</Text>
      </TouchableOpacity> */}
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View
          style={[
            {
              height: height * 0.6,
              width: width * 0.9,
              backgroundColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            },
            animatedStyles,
          ]}>
          <Text style={{fontSize: 32, color: '#000'}}>ShelfLife</Text>
          <View style={{marginVertical: '5%'}}>
            <TouchableOpacity
              onPress={() => {
                HandleSignIn();
              }}
              style={{backgroundColor: '#ababab', padding: '2.5%'}}>
              <Text style={{color: '#fff'}}>Google SignIn</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Login;
