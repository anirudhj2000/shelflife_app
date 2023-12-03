import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import useUserStore from '../utils/store';

const {height, width} = Dimensions.get('window');

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const CategoryCard = () => {
  const focused = useIsFocused();
  const user = useUserStore(state => state.user);
  console.log('user', user.email);
  const updateUser = useUserStore(state => state.updateUser);
  const [category, setCategory] = useState<Array<any>>([]);
  const [max, setMax] = useState(0);

  useEffect(() => {
    getProductList();
  }, [focused]);

  const getProductList = () => {
    console.log('category card', user.email);
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

          const categoryCounts: any = {};
          arr.forEach((item: {category: string | number}) => {
            if (categoryCounts[item.category]) {
              categoryCounts[item.category]++;
            } else {
              categoryCounts[item.category] = 1;
            }
          });
          const categoryArray = Object.keys(categoryCounts).map(category => ({
            name: category,
            count: categoryCounts[category],
          }));

          let maxVal = 0;
          categoryArray.map(item => {
            maxVal = Math.max(maxVal, item.count);
          });

          setMax(maxVal);

          categoryArray.sort((a, b) => b.count - a.count);
          const top3Categories = categoryArray.slice(0, 3);
          setCategory(top3Categories);
        });
  };

  if (category.length == 0) {
    return;
  }

  return (
    <View
      style={{
        width: '95%',
        height: height * 0.3,
        borderWidth: 0.5,
        borderColor: '#c7c7c7',
        borderRadius: 16,
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
          <Text style={{fontSize: 18, color: '#000'}}>Categories</Text>
          <Text style={{fontSize: 12, color: '#000'}}>
            View categories of the products you use
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 16,
        }}>
        {category.map((item, index) => {
          return (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: height * 0.05,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 8,
              }}>
              <View
                style={{
                  width: (width * 0.7 * item.count) / max,
                  backgroundColor: getRandomColor() + '77',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  paddingHorizontal: '2.5%',
                  borderRadius: 2,
                }}>
                <Text style={{color: '#000'}}>{item.name}</Text>
              </View>
              <View
                style={{
                  width: '10%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#000', fontSize: 14}}>{item.count}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default CategoryCard;
