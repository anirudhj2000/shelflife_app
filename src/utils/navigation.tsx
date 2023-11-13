import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import ScannerSceen from '../screens/scanner';
import {AppStackParams} from './types';

const AppStack = createNativeStackNavigator<AppStackParams>();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Scanner" component={ScannerSceen} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
