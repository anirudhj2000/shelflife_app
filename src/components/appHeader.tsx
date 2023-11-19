import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppDrawerParams, AppStackParams, HomeScreenProps} from '../utils/types';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {qrFont} from '../screens/login';

interface AppHeaderInterface {
  navigation: HomeScreenProps;
}

const AppHeader = () => {
  const navigation = useNavigation<DrawerNavigationProp<AppStackParams>>();
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2.5%',
        zIndex: 0,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
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
