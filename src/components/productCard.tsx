import {View, Dimensions, TouchableOpacity, Text, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import dayjs from 'dayjs';

const {height, width} = Dimensions.get('window');

interface ProductCardInfo {
  onPress: () => void;
  title: string;
  productCode: string;
  date: Date;
  image: string;
}

const ProductCard = ({
  onPress,
  title,
  productCode,
  date,
  image,
}: ProductCardInfo) => {
  console.log('date', date);
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#c7c7c7',
        paddingHorizontal: '2.5%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 0.115,
        justifyContent: 'space-between',
        borderRadius: 8,
      }}>
      <View
        style={{
          height: height * 0.07,
          width: height * 0.07,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.5,
          borderColor: '#c7c7c7',
          borderRadius: 8,
        }}>
        <Image
          source={
            image.length > 0
              ? {uri: image}
              : require('../assets/products_alt.png')
          }
          style={{
            height: height * 0.06,
            width: height * 0.06,
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: '2.5%',
          display: 'flex',
          flexDirection: 'column',
          width: width * 0.525,
          height: '70%',
          marginVertical: '5%',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: '#666666', fontSize: 10}}>
          Expiring on {dayjs(date).format('DD MMM, YYYY')}
        </Text>
        <Text style={{color: '#000', fontSize: 18}}>
          {title.length > 0 ? title : 'Title'}
        </Text>
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
            {productCode.length > 0 ? productCode : 'Product Code'}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: width * 0.125,
          height: width * 0.125,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#ff7a33',
          borderRadius: 120,
        }}>
        <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
          {Math.floor(dayjs(date).diff(dayjs(), 'hours', true) / 24)}
        </Text>
        <Text style={{color: '#fff', fontSize: 12, fontWeight: 'bold'}}>
          Days
        </Text>
      </View>
    </View>
  );
};

export default ProductCard;
