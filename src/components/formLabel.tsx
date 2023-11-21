import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface FormLabelInterface {
  title: string;
  requried: boolean;
  fontSize: number;
}

const FormLabel = ({title, requried, fontSize}: FormLabelInterface) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <Text style={{color: '#000', fontSize: fontSize}}>{title}</Text>
      <Text style={{color: 'red', marginTop: -2}}> * </Text>
    </View>
  );
};

export default FormLabel;

const styles = StyleSheet.create({});
