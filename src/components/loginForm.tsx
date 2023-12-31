import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {AppStackProps, AuthStackProps} from '../utils/types';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import {checkIfUserExists} from './signupModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserStore from '../utils/store';

interface LoginFormInterface {
  onPressSignup: () => void;
}

const LoginForm = ({onPressSignup}: LoginFormInterface) => {
  // need to figure out type for the useNavigation
  const navigation = useNavigation<AppStackProps>();
  const updateUser = useUserStore(state => state.updateUser);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onSubmit = () => {
    let isValid = true;

    if (!username) {
      setUsernameError('Email is required.');
      isValid = false;
    } else {
      setUsernameError(null);
    }

    if (!password || password.length < 8) {
      setPasswordError(
        'Password is required and must be at least 8 characters.',
      );
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (isValid) {
      auth()
        .signInWithEmailAndPassword(username, password)
        .then(res => {
          checkIfUserExists(username).then(exists => {
            if (exists) {
              AsyncStorage.setItem('user', JSON.stringify(exists.data()));
              updateUser(exists.data());
              Toast.show({
                position: 'top',
                type: 'success',
                text1: 'Logged in Successfully!',
              });
            }
          });
        })
        .catch(err => {
          console.log(':err', err);
          Toast.show({
            position: 'top',
            type: 'error',
            text1: 'Some error has occurred!',
          });
        });
    }
  };

  return (
    <View style={{display: 'flex', flexDirection: 'column', zIndex: 2}}>
      <TextInput
        placeholder="Email"
        onChangeText={text => setUsername(text)}
        placeholderTextColor={'#c7c7c7'}
        style={[styles.textContainer, {marginBottom: passwordError ? 0 : '5%'}]}
      />
      {usernameError && (
        <Text style={{color: '#E50000', fontSize: 12, marginVertical: 4}}>
          {usernameError}
        </Text>
      )}
      <TextInput
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={'#c7c7c7'}
        onChangeText={text => setPassword(text)}
        style={[styles.textContainer, {marginBottom: passwordError ? 0 : '5%'}]}
      />
      {passwordError && (
        <Text style={{color: '#E50000', fontSize: 12, marginVertical: 4}}>
          {passwordError}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => {
          onSubmit();
          //   navigation.navigate('App', {screen: 'Home'});
        }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2.5%',
          backgroundColor: '#000',
          marginVertical: '1.5%',
          borderRadius: 8,
        }}>
        <Text style={{fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressSignup}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2.5%',
          backgroundColor: '#fff',
          marginVertical: '1.5%',
          borderRadius: 8,
          borderWidth: 2,
          borderColor: '#000',
        }}>
        <Text style={{fontSize: 16, color: '#000', fontWeight: 'bold'}}>
          Signup
        </Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '2.5%',
        }}>
        <TouchableOpacity
          onPress={() =>
            Linking.canOpenURL(
              'https://www.termsandconditionsgenerator.com/live.php?token=l4gKaE1cDYxZaX83bKNnod3VmWZOuasq',
            ).then(supports => {
              if (supports)
                Linking.openURL(
                  'https://www.termsandconditionsgenerator.com/live.php?token=l4gKaE1cDYxZaX83bKNnod3VmWZOuasq',
                );
            })
          }>
          <Text style={{textDecorationLine: 'underline', color: '#000'}}>
            Terms and Conditions
          </Text>
        </TouchableOpacity>
        <Text style={{color: '#000'}}> and </Text>
        <TouchableOpacity
          onPress={() =>
            Linking.canOpenURL(
              'https://www.termsfeed.com/live/0259560d-f1d3-45b3-b333-1c0baf313857',
            ).then(supports => {
              if (supports)
                Linking.openURL(
                  'https://www.termsfeed.com/live/0259560d-f1d3-45b3-b333-1c0baf313857',
                );
            })
          }>
          <Text style={{textDecorationLine: 'underline', color: '#000'}}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: '5%',
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#000',
  },
});
