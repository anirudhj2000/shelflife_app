import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import CommonHeaderWithBack from '../components/commonHeader';
import {AppStackProps} from '../utils/types';
import firestore from '@react-native-firebase/firestore';
import ProductCard from '../components/productCard';

const {height, width} = Dimensions.get('window');
const ProductList = ({navigation}: AppStackProps) => {
  const [products, setProducts] = useState<Array<any>>([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    firestore()
      .collection('Products')
      .where('user', '==', 'anirudh')
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
