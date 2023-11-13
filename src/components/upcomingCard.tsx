import React from 'react';
import {View, TouchableOpacity, Text, Dimensions, FlatList} from 'react-native';
import ProductCard from './productCard';

const {height, width} = Dimensions.get('window');

const UpcomingCard = () => {
  return (
    <View
      style={{
        width: '95%',
        minHeight: height * 0.25,
        borderWidth: 1,
        borderColor: '#000',
        marginHorizontal: '2.5%',
        marginVertical: '5%',
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: '2.5%',
        paddingVertical: '2.5%',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22, color: '#000'}}>Expiring Soon...</Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
              textDecorationLine: 'underline',
            }}>
            All Products
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={[1, 2, 4, 5]}
        nestedScrollEnabled
        style={{marginTop: '2.5%'}}
        keyExtractor={(item, key) => key.toString()}
        renderItem={({item, index}) => {
          return <ProductCard key={index} />;
        }}
      />
    </View>
  );
};

export default UpcomingCard;
