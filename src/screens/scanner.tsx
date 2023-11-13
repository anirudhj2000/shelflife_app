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

const {height, width} = Dimensions.get('window');
const semiTransparent = '#00000088';
const ScannerSceen = () => {
  const device = useCameraDevice('back');

  const {hasPermission, requestPermission} = useCameraPermission();

  if (device == null) {
    return;
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanne${codes.length} codes!`, codes);
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
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#fff',
              height: height * 0.1,
              width: '80%',
            }}>
            <Text style={{color: '#000'}}>Add Manually</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ScannerSceen;

const styles = StyleSheet.create({});
