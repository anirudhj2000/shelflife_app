import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {AppDrawerParams, AppStackParams} from '../utils/types';

interface AppHeaderInterface {
  navigation: DrawerNavigationProp<AppStackParams>;
}

const AppHeader = ({navigation}: AppHeaderInterface) => {
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
        zIndex: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
        style={{marginHorizontal: '1.5%'}}>
        <Icon name="menu" size={30} color="#fff" />
      </TouchableOpacity>
      <Text
        style={{
          color: '#ffff',
          fontSize: 32,
          fontWeight: 'bold',
        }}>
        BeforeExp
      </Text>
      <View style={{width: '5%'}} />
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({});
