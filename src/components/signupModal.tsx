import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {qrFont} from '../screens/login';

const {height, width} = Dimensions.get('window');

interface ModalInterface {
  modalVisible: boolean;
  handleModalClose: () => void;
}

const SignupModal = ({modalVisible, handleModalClose}: ModalInterface) => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onSubmit = () => {};

  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(event => {
      pressed.value = true;
      console.log('event values start', event.translationY);
    })
    .onChange(event => {
      offset.value = event.translationY;
      console.log('event values', event.translationY);
    })
    .onFinalize(event => {
      pressed.value = false;
      if (event.translationY > 300) {
        console.log('event values', event.translationY);
        runOnJS(handleModalClose)();
        offset.value = height * 0.6;
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateY: offset.value}],
  }));

  return (
    <View style={{display: 'flex'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}>
        <GestureHandlerRootView style={{flex: 1}}>
          <View style={styles.centeredView}>
            <Animated.View style={[styles.modalView, animatedStyles]}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <GestureDetector gesture={pan}>
                  <View
                    style={[
                      {
                        height: 8,
                        width: '20%',
                        backgroundColor: '#666666',
                        borderRadius: 16,
                        marginBottom: '2.5%',
                        zIndex: 5,
                      },
                    ]}></View>
                </GestureDetector>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '2.5%',
                }}>
                <Text style={{fontSize: 48, fontFamily: qrFont, color: '#000'}}>
                  Signup
                </Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginVertical: '5%',
                }}>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text
                    style={{
                      marginHorizontal: 4,
                      marginBottom: '1%',
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Name
                  </Text>
                  <TextInput
                    placeholder="Name"
                    onChangeText={text => setName(text)}
                    style={[
                      styles.textContainer,
                      {marginBottom: passwordError ? 0 : '5%'},
                    ]}
                  />
                  {usernameError && <Text>{usernameError}</Text>}
                </View>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text
                    style={{
                      marginHorizontal: 4,
                      marginBottom: '1%',
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Email
                  </Text>
                  <TextInput
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    style={[
                      styles.textContainer,
                      {marginBottom: passwordError ? 0 : '5%'},
                    ]}
                  />
                  {usernameError && <Text>{usernameError}</Text>}
                </View>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text
                    style={{
                      marginHorizontal: 4,
                      marginBottom: '1%',
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Password
                  </Text>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    style={[
                      styles.textContainer,
                      {marginBottom: passwordError ? 0 : '5%'},
                    ]}
                  />
                  {passwordError && <Text>{passwordError}</Text>}
                </View>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <Text
                    style={{
                      marginHorizontal: 4,
                      marginBottom: '1%',
                      fontSize: 14,
                      color: '#000',
                    }}>
                    Confirm Password
                  </Text>
                  <TextInput
                    placeholder="Confirm Password"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                    style={[
                      styles.textContainer,
                      {marginBottom: passwordError ? 0 : '5%'},
                    ]}
                  />
                  {passwordError && <Text>{passwordError}</Text>}
                </View>
              </View>
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
                  Signup
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
};

export default SignupModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    height: '70%',
    width: '100%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: '5%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textContainer: {
    marginBottom: '5%',
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});
