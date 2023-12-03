import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonHeaderWithBack from '../components/commonHeader';
import {AppStackProps} from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import ProductCard from '../components/productCard';
import useUserStore from '../utils/store';
import {useIsFocused} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
const ProductList = ({navigation}: AppStackProps) => {
  const focused = useIsFocused();
  const [products, setProducts] = useState<Array<any>>([]);
  const user = useUserStore(state => state.user);
  const updateUser = useUserStore(state => state.updateUser);

  useEffect(() => {
    getProductList();
  }, [focused]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    navigation.navigate('App', {screen: 'Home'});
    return true;
  };

  const getProductList = () => {
    if (user.email)
      firestore()
        .collection('Products')
        .where('user', '==', user.email)
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
    <View style={{height: '100%', backgroundColor: '#fff'}}>
      <CommonHeaderWithBack
        title="Products"
        onPress={() => {
          navigation.navigate('App', {screen: 'Home'});
        }}
      />
      <View
        style={{height: height * 0.9, width: '95%', marginHorizontal: '2.5%'}}>
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View style={{marginBottom: '2.5%'}} key={index}>
                <ProductCard
                  title={item.title}
                  image={item.image}
                  large={true}
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
      </View>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({});
