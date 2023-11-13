import {View, Dimensions, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';

const {height, width} = Dimensions.get('window');

const ProductCard = () => {
  return (
    <View
      style={{
        marginTop: '2.5%',
        paddingVertical: '2.5%',
        borderBottomWidth: 0.5,
        borderColor: '#c7c7c7',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 0.1,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          height: height * 0.08,
          width: height * 0.08,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#000',
        }}>
        <Icon name="bottle-droplet" size={30} color="#000" />
      </View>
      <View
        style={{
          marginHorizontal: '2.5%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: width * 0.525,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{color: '#c7c7c7', fontSize: 10}}>20,May 2000</Text>
          <Text style={{color: '#000', fontSize: 18}}>Product Name</Text>
        </View>
        <View
          style={{
            backgroundColor: '#c7c7c777',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1%',
            borderRadius: 4,
            width: '40%',
          }}>
          <Text
            style={{
              color: '#00000089',
              fontSize: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {'9876545678'}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: width * 0.1,
          backgroundColor: 'red',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          borderWidth: 1,
        }}>
        <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
          24
        </Text>
        <Text style={{color: '#000', fontSize: 12, fontWeight: 'bold'}}>
          Days
        </Text>
      </View>
    </View>
  );
};

export default ProductCard;
