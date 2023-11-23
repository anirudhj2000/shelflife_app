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
import {AppStackProps, HomeScreenProps} from '../utils/types';
import StatsCard from '../components/totalStatsCard';
import UpcomingCard from '../components/upcomingCard';
import CategoryCard from '../components/categoryCard';
import AppHeader from '../components/appHeader';

const {height, width} = Dimensions.get('window');

const Home = ({navigation}: AppStackProps) => {
  return (
    <View style={{flex: 1, backgroundColor: '#b6f3fc'}}>
      <AppHeader />
      <ScrollView style={{height: height, zIndex: 1}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: height,
            backgroundColor: '#fff',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            marginTop: '20%',
            paddingTop: '5%',
            paddingHorizontal: '2.5%',
          }}>
          <StatsCard
            total={100}
            upcoming={30}
            onPress={() => navigation.navigate('App', {screen: 'Home'})}
          />
          <UpcomingCard
            handleViewProducts={() => {
              navigation.navigate('App', {screen: 'Products'});
            }}
          />
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
          zIndex: 2,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('App', {screen: 'Scanner'})}
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
