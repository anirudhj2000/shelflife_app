import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import ScannerSceen from '../screens/scanner';
import {AppStackParams} from './types';

const BottomTabs = createBottomTabNavigator<AppStackParams>();

const BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator screenOptions={{headerShown: false}}>
      <BottomTabs.Screen name="Home" component={Home} />
      <BottomTabs.Screen name="Scanner" component={ScannerSceen} />
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
