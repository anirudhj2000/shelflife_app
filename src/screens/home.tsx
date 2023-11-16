import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AppStackProps, AppDrawerProps} from '../utils/types';
import StatsCard from '../components/totalStatsCard';
import UpcomingCard from '../components/upcomingCard';
import CategoryCard from '../components/categoryCard';
import AppHeader from '../components/appHeader';

const {height, width} = Dimensions.get('window');

const Home = ({navigation}: AppDrawerProps) => {
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Image
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          opacity: 0.7,
        }}
        source={require('../assets/appbackground.png')}
      />
      <AppHeader navigation={navigation} />
      <ScrollView style={{height: height}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: height,
            backgroundColor: '#fff',
            // borderTopLeftRadius: 32,
            // borderTopRightRadius: 32,
            marginTop: '20%',
            borderWidth: 2,
            borderColor: '#000',
          }}>
          <StatsCard total={100} upcoming={30} />
          <UpcomingCard />
          <CategoryCard />
        </View>
      </ScrollView>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          width: '100%',
          bottom: 0,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Scanner')}
          style={{
            backgroundColor: '#000',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '2.5%',
            paddingHorizontal: '10%',
            paddingVertical: '3.5%',
            borderRadius: 32,
          }}>
          <Icon name="line-scan" size={24} color="#fff" />
          <Text style={{color: '#fff', marginLeft: '5%', fontSize: 16}}>
            Scan New Item
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
