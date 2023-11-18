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
  ReduceMotion,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Eye from '../components/eye';
import LoginForm from '../components/loginForm';

const {height, width} = Dimensions.get('window');
export const qrFont = 'LibreBarcode128Text-Regular';

GoogleSignin.configure({
  webClientId:
    '439331411954-0sihu46bdd7508j7shfi01f1853hatkj.apps.googleusercontent.com',
});

const Login = ({navigation}: AuthStackProps) => {
  const translateValue = useSharedValue(500);
  const qrCodePos = useSharedValue(-width * 0.25);

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

  const qrCodeStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: qrCodePos.value,
      },
    ],
  }));

  useEffect(() => {
    translateValue.value = 0;
  }, []);

  useEffect(() => {
    qrCodePos.value = withRepeat(
      withTiming(width * 1.25, {duration: 2500, easing: Easing.linear}),
      -1,
      true,
    );
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
    <View style={{flex: 1, backgroundColor: '#b6f3fc'}}>
      {/* <Image
        source={require('../assets/appbackground.png')}
        style={{height: '100%', width: '100%', position: 'absolute'}}
      /> */}
      <View
        style={{
          height: height * 0.35,
          marginTop: '5%',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 54,
              color: '#000',
              fontFamily: qrFont,
              marginTop: '2.5%',
              marginBottom: '5%',
            }}>
            ShelfLife
          </Text>
        </View>
        {/* <Eye />
        <Animated.View style={[{width: width * 0.225}, qrCodeStyles]}>
          <Image
            source={require('../assets/barcode.png')}
            style={{
              resizeMode: 'contain',
              height: height * 0.125,
              width: width * 0.225,
            }}
          />
        </Animated.View> */}
      </View>
      <View
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Animated.View
          style={[
            {
              height: height * 0.6,
              width: width,
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              padding: '5%',
            },
            animatedStyles,
          ]}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '2.5%',
            }}>
            <Text style={{fontSize: 48, fontFamily: qrFont, color: '#000'}}>
              Login
            </Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <View
              style={{
                backgroundColor: '#000',
                padding: '2.5%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                marginTop: '7.5%',
                marginBottom: '2.5%',
              }}>
              <Image
                source={require('../assets/search.png')}
                style={{
                  height: 16,
                  width: 16,
                  marginHorizontal: '2.5%',
                }}
              />
              <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
                Login with Google
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: width * 0.4,
                  borderBottomColor: '#c7c7c7',
                  borderBottomWidth: 1,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginVertical: '2.5%',
                }}>
                OR
              </Text>
              <View
                style={{
                  width: width * 0.4,
                  borderBottomColor: '#c7c7c7',
                  borderBottomWidth: 1,
                }}
              />
            </View>
            <LoginForm />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Login;
