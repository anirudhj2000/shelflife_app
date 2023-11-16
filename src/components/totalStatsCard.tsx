import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface StatusCardInterface {
  total: number;
  upcoming: number;
}

const StatsCard = ({total, upcoming}: StatusCardInterface) => {
  return (
    <TouchableOpacity
      style={{
        width: '95%',
        marginHorizontal: '2.5%',
        marginVertical: '5%',
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: '#000',
        display: 'flex',
        flexDirection: 'row',
      }}>
      <View
        style={{display: 'flex', justifyContent: 'center', marginLeft: '5%'}}>
        <Icon name="skull-scan" size={30} color="#000" />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '5%',
          width: '100%',
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{color: '#000', fontWeight: 'bold', fontSize: 16}}>
            {upcoming} of your products are expiring soon...
          </Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{color: '#000'}}>total products : {total}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StatsCard;
