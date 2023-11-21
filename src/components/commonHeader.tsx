import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {height, width} = Dimensions.get('window');

interface CommonHeaderInterface {
  onPress: () => void;
  title: string;
}

const CommonHeaderWithBack = ({title, onPress}: CommonHeaderInterface) => {
  return (
    <View
      style={{
        height: height * 0.075,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '2.5%',
        marginVertical: 8,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={onPress}>
          <AntDesign name="left" size={24} color="#000" />
        </TouchableOpacity>
        <Text
          style={{
            marginHorizontal: '5%',
            fontSize: 24,
            color: '#000',
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default CommonHeaderWithBack;

const styles = StyleSheet.create({});
