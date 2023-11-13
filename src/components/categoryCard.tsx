import React from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

const CategoryCard = () => {
  return (
    <View
      style={{
        width: '95%',
        minHeight: height * 0.25,
        borderWidth: 1,
        borderColor: '#000',
        marginHorizontal: '2.5%',
        marginVertical: '2.5%',
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: '2.5%',
        paddingVertical: '2.5%',
        marginBottom: '5%',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <Text style={{fontSize: 22, color: '#000'}}>Categories</Text>
          <Text style={{fontSize: 14, color: '#000'}}>
            View categories of the products you use
          </Text>
        </View>
        {/* <TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: '#000',
              textDecorationLine: 'underline',
            }}>
            All Products
          </Text>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '5%',
        }}>
        <View
          style={{
            height: height * 0.075,
            borderWidth: 1,
            width: width * 0.4,
          }}>
          <Text style={{color: '#000'}}>A</Text>
        </View>
        <View
          style={{
            height: height * 0.075,
            borderWidth: 1,
            width: width * 0.4,
          }}>
          <Text style={{color: '#000'}}>A</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: '5%',
        }}>
        <View
          style={{
            height: height * 0.075,
            borderWidth: 1,
            width: width * 0.4,
          }}>
          <Text style={{color: '#000'}}>A</Text>
        </View>
        <View
          style={{
            height: height * 0.075,
            borderWidth: 1,
            width: width * 0.4,
          }}>
          <Text style={{color: '#000'}}>A</Text>
        </View>
      </View>
    </View>
  );
};

export default CategoryCard;
