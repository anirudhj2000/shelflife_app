import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onSubmit = () => {
    let isValid = true;

    if (!username) {
      setUsernameError('Username is required.');
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
      console.log(`Username: ${username}, Password: ${password}`);
    }
  };

  return (
    <View style={{display: 'flex', flexDirection: 'column'}}>
      <TextInput
        placeholder="Username"
        onChangeText={text => setUsername(text)}
        style={[styles.textContainer, {marginBottom: passwordError ? 0 : '5%'}]}
      />
      {usernameError && <Text>{usernameError}</Text>}
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        style={[styles.textContainer, {marginBottom: passwordError ? 0 : '5%'}]}
      />
      {passwordError && <Text>{passwordError}</Text>}
      <TouchableOpacity
        onPress={() => {
          onSubmit();
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
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '5%',
        }}>
        <Text style={{textDecorationLine: 'underline', color: '#000'}}>
          Terms and Conditions
        </Text>
        <Text style={{color: '#000'}}> and </Text>
        <Text style={{textDecorationLine: 'underline', color: '#000'}}>
          Privacy Policy
        </Text>
      </TouchableOpacity>
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
  },
});
