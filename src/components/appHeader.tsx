import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AppDrawerParams,
  AppStackParams,
  AppStackProps,
  DrawerStackProps,
  HomeScreenProps,
} from '../utils/types';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {qrFont} from '../screens/login';
import {DrawerActions} from '@react-navigation/native';

interface AppHeaderInterface {
  navigation: HomeScreenProps;
}

const AppHeader = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2.5%',
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
          console.log('clicked');
        }}
        style={{marginHorizontal: '1.5%'}}>
        <Icon name="menu" size={30} color="#000" />
      </TouchableOpacity>
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
      <View style={{width: '10%'}} />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
