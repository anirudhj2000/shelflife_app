import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import ScannerSceen from '../screens/scanner';
import Login from '../screens/login';
import AddProduct from '../screens/addProduct';
import {AuthStackParams, AppStackParams, AppDrawerParams} from './types';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProductList from '../screens/productList';
import AppDrawerComponent from '../components/appDrawer';

const AppStack = createNativeStackNavigator<AppStackParams>();
const AppDrawer = createDrawerNavigator<AppDrawerParams>();

export const AppStackNavigator = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Scanner" component={ScannerSceen} />
      <AppStack.Screen name="NewProduct" component={AddProduct} />
      <AppStack.Screen name="Products" component={ProductList} />
    </AppStack.Navigator>
  );
};

export const AppDrawerNavigator = () => {
  return (
    <AppDrawer.Navigator
      drawerContent={props => <AppDrawerComponent {...props} />}
      screenOptions={{headerShown: false}}>
      <AppDrawer.Screen name="App" component={AppStackNavigator} />
    </AppDrawer.Navigator>
  );
};
const AuthStack = createNativeStackNavigator<AuthStackParams>();

export const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};
