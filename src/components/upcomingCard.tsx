import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import ProductCard from './productCard';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {AppStackProps} from '../utils/types';
import Icon from 'react-native-vector-icons/AntDesign';
import useUserStore from '../utils/store';
import {useIsFocused} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

interface UpcomingCardInterfcae {
  handleViewProducts: () => void;
}

const UpcomingCard = ({handleViewProducts}: UpcomingCardInterfcae) => {
  const focused = useIsFocused();
  const user = JSON.parse(useUserStore(state => state.user));
  const navigation = useNavigation<AppStackProps>();
  const [products, setProducts] = useState<Array<any>>([]);

  useEffect(() => {
    getProductList();
  }, [focused]);

  const getProductList = () => {
    if (user.email)
      firestore()
        .collection('Products')
        .where('user', '==', user?.email)
        .orderBy('expiryDate')
        .limit(5)
        .get()
        .then(query => {
          let arr: any = [];

          console.log('result', query.docs);
          query.docs.map(item => {
            arr.push(item.data());
          });
          setProducts(arr);
        });
  };
  return (
    <View
      style={{
        width: '95%',
        height: height * 0.5,
        borderWidth: 0.5,
        borderColor: '#666666',
        marginHorizontal: '2.5%',
        marginVertical: '2.5%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 16,
      }}>
      {products.length > 0 ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: height * 0.05,
            paddingHorizontal: '4%',
          }}>
          <Text style={{fontSize: 18, color: '#000'}}>Expiring Soon...</Text>
        </View>
      ) : (
        <View style={{height: height * 0.05}} />
      )}
      <FlatList
        data={products}
        nestedScrollEnabled
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: height * 0.4,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: '2.5%',
              }}>
              <Image
                source={require('../assets/empty.png')}
                style={{height: 48, width: 48, tintColor: '#666666'}}
              />
              <Text
                style={{fontSize: 16, color: '#000000aa', marginTop: '2.5%'}}>
                No Products
              </Text>
              <Text style={{fontSize: 12, color: '#00000099'}}>
                Please the scan below to start adding products
              </Text>
            </View>
          );
        }}
        style={{height: height * 0.4}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View
              style={{marginBottom: '2.5%', marginHorizontal: '2.5%'}}
              key={index}>
              <ProductCard
                title={item.title}
                image={item.image}
                date={
                  new Date(
                    item.expiryDate.seconds * 1000 +
                      item.expiryDate.nanoseconds / 1000000,
                  )
                }
                productCode={item.productCode}
                onPress={() => {}}
              />
            </View>
          );
        }}
      />

      {products.length > 0 ? (
        <View
          style={{
            height: height * 0.05,
            backgroundColor: '#ffe1c9',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={handleViewProducts}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#fa7f20',
              }}>
              View All Products
            </Text>
            <Icon
              name="doubleright"
              size={16}
              color="#fa7f20"
              style={{marginTop: 2, marginHorizontal: 4}}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default UpcomingCard;
