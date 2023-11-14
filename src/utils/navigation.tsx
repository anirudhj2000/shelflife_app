import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import ScannerSceen from '../screens/scanner';
import {AppStackParams} from './types';
import Login from '../screens/login';
import {AuthStackParams} from './types';

const AppStack = createNativeStackNavigator<AppStackParams>();

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Scanner" component={ScannerSceen} />
    </AppStack.Navigator>
  );
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Scanner" component={ScannerSceen} />
    </AuthStack.Navigator>
  );
};
