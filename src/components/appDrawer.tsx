import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import useUserStore from '../utils/store';

const {height, width} = Dimensions.get('window');

let screens = [
  {
    screen: 'Home',
    icon: 'home-export-outline',
    name: 'Home',
  },
  {
    screen: 'Products',
    icon: 'basket-outline',
    name: 'Products',
  },
  {
    screen: 'Scanner',
    icon: 'barcode-scan',
    name: 'Add Products',
  },
];

const AppDrawerComponent = ({navigation}: DrawerContentComponentProps) => {
  //   const [user, setUser] = React.useState<any>({});
  const updateUser = useUserStore(state => state.updateUser);
  const user = useUserStore(state => state.user);
  console.log('user', user.email);
  //   useEffect(() => {
  //     fetchInfo();
  //   }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        AsyncStorage.clear();
        updateUser(null);
        console.log('logged out');
      });
  };

  //   const fetchInfo = async () => {
  //     const userData = await AsyncStorage.getItem('user');
  //     if (userData) {
  //       setUser(JSON.parse(userData));
  //     }
  //   };
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 1,
        position: 'absolute',
        top: 0,
      }}>
      <View>
        <View
          style={{
            width: '95%',
            marginHorizontal: '2.5%',
            marginTop: '10%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#c7c7c766',
            padding: '5%',
            borderRadius: 8,
          }}>
          {user.image ? (
            <Image
              style={{
                height: height * 0.075,
                width: height * 0.075,
                borderRadius: height * 0.1,
              }}
              source={{uri: user.image}}
            />
          ) : (
            <View
              style={{
                height: height * 0.075,
                width: height * 0.075,
                borderRadius: height * 0.1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#556565',
              }}>
              <Text style={{fontSize: 24, color: '#fff'}}>
                {user?.name?.length > 0 ? user.name[0] : '0'}
              </Text>
            </View>
          )}
          <Text style={{fontSize: 16, color: '#000', marginTop: '5%'}}>
            {user?.name}
          </Text>
          <Text style={{fontSize: 12, color: '#000', marginTop: '2.5%'}}>
            {user?.email}
          </Text>
        </View>
        <View
          style={{
            marginTop: '5%',
            display: 'flex',
            flexDirection: 'column',
          }}>
          {screens.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('App', {screen: item.screen});
                  navigation.closeDrawer();
                }}
                key={index}
                style={{
                  width: '95%',
                  marginHorizontal: '2.5%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 0.7,
                  borderColor: '#c7c7c7',
                  marginBottom: '2.5%',
                  padding: '5%',
                  borderRadius: 8,
                }}>
                <Icon name={item.icon} color={'#000'} size={16} />
                <Text
                  style={{fontSize: 16, marginHorizontal: '5%', color: '#000'}}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          handleLogout();
        }}
        style={{
          height: height * 0.06,
          marginHorizontal: '2.5%',
          backgroundColor: '#000',
          marginVertical: '5%',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="logout" color={'#fff'} size={20} />
        <Text style={{color: '#fff', fontSize: 16, marginHorizontal: '2.5%'}}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppDrawerComponent;

const styles = StyleSheet.create({});
