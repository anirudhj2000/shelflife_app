import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  CameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppStackProps} from '../utils/types';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('window');

const semiTransparent = '#00000088';
const ScannerSceen = ({navigation}: AppStackProps) => {
  const device = useCameraDevice('back');

  const {hasPermission, requestPermission} = useCameraPermission();

  if (device == null) {
    return <></>;
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanne${codes.length} codes!`, codes);
      if (codes[0].value) {
        navigation.navigate('App', {
          screen: 'NewProduct',
          params: {UPCCode: codes[0].value},
        });
      }
    },
  });

  useEffect(() => {
    console.log('has permission', hasPermission);
    if (!hasPermission) {
      requestPermission()
        .then(res => {
          console.log('res', res);
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <Camera
        style={[StyleSheet.absoluteFill, {position: 'absolute', zIndex: 1}]}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />

      <View
        style={{
          height: '100%',
          width: '100%',
          zIndex: 2,
          backgroundColor: 'transparent',
        }}>
        {/* top divider */}
        <View
          style={{
            backgroundColor: semiTransparent,
            height: height * 0.35,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View
            style={{
              height: height * 0.075,
              backgroundColor: '#00000099',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: '2.5%',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} color="#fff" />
              </TouchableOpacity>
              <Text
                style={{
                  marginHorizontal: '5%',
                  fontSize: 24,
                  color: '#fff',
                }}>
                Scan products
              </Text>
            </View>
          </View>
        </View>
        {/* center panel */}
        <View
          style={{display: 'flex', flexDirection: 'row', height: height * 0.2}}>
          <View
            style={{backgroundColor: semiTransparent, width: width * 0.1}}
          />
          <View
            style={{
              height: height * 0.2,
              width: width * 0.8,
              borderColor: '#fff',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: '5%',
              zIndex: 7,
              borderRadius: 4,
            }}>
            <View
              style={{width: '100%', borderBottomWidth: 1, borderColor: 'red'}}
            />
          </View>
          <View
            style={{backgroundColor: semiTransparent, width: width * 0.1}}
          />
        </View>
        {/* bottom panel */}
        <View
          style={{
            backgroundColor: semiTransparent,
            height: height * 0.46,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('App', {
                screen: 'NewProduct',
                params: {UPCCode: ''},
              });
            }}
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#fff',
              paddingVertical: '2.5%',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: '7.5%',
              borderRadius: 64,
            }}>
            <Icon name="plus-circle-outline" size={24} color="#000" />
            <Text style={{color: '#000', marginLeft: '2.5%', fontSize: 18}}>
              Add Item Manually
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScannerSceen;

const styles = StyleSheet.create({});
