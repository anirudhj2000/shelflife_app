/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  AuthStackNavigator,
  AppStackNavigator,
  AppDrawerNavigator,
} from './src/utils/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useUserStore from './src/utils/store';
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
  let userData = useUserStore(state => state.user);
  let updateUser = useUserStore(state => state.updateUser);
  const [user, setUser] = React.useState<string | null>(null);

  // const [user, setUser] = React.useState<any>(
  //   useUserStore(state => state.user),
  // );

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    let data = await AsyncStorage.getItem('user');
    setUser(data);
    updateUser(data);
    console.log('user data', data);
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        {userData ? <AppDrawerNavigator /> : <AuthStackNavigator />}
      </NavigationContainer>
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
