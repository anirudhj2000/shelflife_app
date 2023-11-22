import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppStackProps} from '../utils/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonHeaderWithBack from '../components/commonHeader';
import FormLabel from '../components/formLabel';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import dayjs from 'dayjs';
import ProductCard from '../components/productCard';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const options = {
  method: 'GET',
  url: 'https://barcodes1.p.rapidapi.com/',
  params: {
    query: '',
  },
  headers: {
    'X-RapidAPI-Key': '8aafb5a52bmshad7a070fb7df7d1p1c2bd4jsn608b773f7da1',
    'X-RapidAPI-Host': 'barcodes1.p.rapidapi.com',
  },
};

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const AddProduct = ({navigation, route}: AppStackProps) => {
  //   const route = useRoute();
  //   const nestedParams = route.params;

  const [productCode, setProductCode] = useState('');
  const [date, setDate] = useState<Date>(tomorrow);
  const [open, setOpen] = useState(false);
  const [productTitle, setProductTitle] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string>('');
  const [productCodeError, setProductCodeError] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [errorData, setErrorData] = useState<string | null>();

  useEffect(() => {
    console.log('route', JSON.stringify(route));
    if (route.params) {
      let obj: any = route.params;
      console.log('route', JSON.stringify(route), obj.UPCCode);
      setProductCode(obj.UPCCode);
    }
  }, [route.params]);

  useEffect(() => {
    console.log('productCode', productCode);
    if (productCode.length > 12 && productCode.length < 16) {
      getProductInfo();
      setProductCodeError(false);
    } else if (productCode.length >= 16) {
      setProductCodeError(true);
    }
  }, [productCode]);

  const handleDataClear = () => {
    setProductCategory('');
    setProductCode('');
    setImage('');
    setProductTitle('');
    setProductCodeError(false);
  };

  useEffect(() => {
    Toast.show({
      type: 'info',
      text1: 'This is an info message',
    });
  });

  const handleSubmit = () => {
    if (productCode.length == 0) {
      setErrorData('Please Enter Product Code!');
      return;
    }

    if (productCategory.length == 0) {
      setErrorData('Please Enter Product Category!');
      return;
    }

    if (date && dayjs(date) > dayjs(tomorrow)) {
      setErrorData('Please Enter Valid Expiry Date!');
      return;
    }

    if (productTitle.length == 0) {
      setErrorData('Please Enter Product Title!');
      return;
    }

    let obj: any = {
      productCode: productCode,
      title: productTitle,
      category: productCategory,
      expiryDate: date,
    };

    if (image.length > 0) {
      obj[image] = image;
    }

    firestore()
      .collection('Products')
      .doc(productCode)
      .set(obj)
      .then(() => {
        Toast.show({
          type: 'info',
          text1: 'This is an info message',
        });
        console.log('User added!');
      });
  };

  const getProductInfo = () => {
    console.log('called');
    options.params.query = productCode;
    try {
      axios
        .request(options)
        .then(res => {
          console.log('res approduct code res', JSON.stringify(res.data));

          if (res.data.product.category) {
            setProductCategory(res.data.product.category[0]);
          }

          if (res.data.product.images) {
            setImage(res.data.product.images[0]);
          }

          if (res.data.product.title) {
            setProductTitle(res.data.product.title);
          }
        })
        .catch(err => {
          console.log('err', err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{height: '100%', backgroundColor: '#fff'}}>
      <CommonHeaderWithBack
        title="Add Product"
        onPress={() => {
          navigation.goBack();
          handleDataClear();
        }}
      />
      {productCode.length > 12 && !productCodeError ? (
        <View
          style={{
            display: 'flex',
            width: '95%',
            marginHorizontal: '2.5%',
            marginBottom: '5%',
            flexDirection: 'column',
          }}>
          <Text style={{color: '#000', marginBottom: 8, fontStyle: 'italic'}}>
            Preview..
          </Text>
          <ProductCard
            title={
              productTitle.length > 0
                ? `${productTitle.slice(0, 25)}...`
                : productTitle
            }
            productCode={productCode}
            date={date}
            onPress={() => {}}
            image={image}
          />
        </View>
      ) : null}
      <View
        style={{
          display: 'flex',
          width: '95%',
          marginHorizontal: '2.5%',
        }}>
        <View style={{display: 'flex', flexDirection: 'column'}}>
          <FormLabel title="UPC/EAN Code" requried={true} fontSize={14} />
          <View>
            <TextInput
              value={productCode}
              placeholder="Product Code"
              placeholderTextColor={'#666666'}
              style={{
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 8,
                borderColor: '#666666',
                marginTop: 8,
                color: '#000',
              }}
              onChangeText={val => {
                setProductCode(val);
              }}
            />
          </View>
          <Text
            style={{fontSize: 12, color: productCodeError ? 'red' : '#666666'}}>
            {productCodeError
              ? 'Please Enter Valid Product Code'
              : 'Enter the product code for identifying product'}
          </Text>
        </View>
        {productCode.length > 12 && !productCodeError ? (
          <View
            style={{display: 'flex', flexDirection: 'column', marginTop: '5%'}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '2.5%',
              }}>
              <FormLabel title="Expiry Date" requried={true} fontSize={14} />
              <TouchableOpacity
                onPress={() => {
                  setOpen(true);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  padding: '4%',
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: '#666666',
                  marginTop: 8,
                }}>
                <Text style={{color: '#000'}}>
                  {dayjs(date).format('DD MMM, YYYY')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '2.5%',
              }}>
              <FormLabel title="Product Title" requried={true} fontSize={14} />
              <TextInput
                value={productTitle}
                placeholder="Prouduct Title"
                placeholderTextColor={'#666666'}
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  borderColor: '#666666',
                  marginTop: 8,
                  color: '#000',
                }}
                onChangeText={val => {
                  setProductTitle(val);
                }}
              />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '2.5%',
              }}>
              <FormLabel
                title="Product Category"
                requried={true}
                fontSize={14}
              />
              <TextInput
                value={productCategory}
                placeholder="Prouduct Category"
                placeholderTextColor={'#666666'}
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  borderColor: '#666666',
                  marginTop: 8,
                  color: '#000',
                }}
                onChangeText={val => {
                  setProductCategory(val);
                }}
              />
            </View>
          </View>
        ) : null}
      </View>
      <View></View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '95%',
          marginHorizontal: '2.5%',
          position: 'absolute',
          justifyContent: 'space-between',
          bottom: 16,
          backgroundColor: '#fff',
        }}>
        <TouchableOpacity
          onPress={() => {
            handleDataClear();
          }}
          style={[
            styles.genericViewStyle,
            {
              width: '47.5%',
              borderWidth: 1,
              padding: '3%',
              borderRadius: 8,
            },
          ]}>
          <Text style={{color: '#000'}}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleSubmit();
          }}
          style={[
            styles.genericViewStyle,
            {
              width: '47.5%',
              borderWidth: 1,
              padding: '3%',
              borderRadius: 8,
              backgroundColor: '#000',
            },
          ]}>
          <Text style={{color: '#fff'}}>Submit</Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        minimumDate={tomorrow}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
        mode="date"
      />
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  genericStyleContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '95%',
    marginHorizontal: '2.5%',
  },

  genericViewStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
