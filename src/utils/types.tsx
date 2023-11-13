import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type AppStackParams = {
  Home: undefined;
  Scanner: undefined;
};

export type AppStackProps = NativeStackScreenProps<
  AppStackParams,
  'Home',
  'Scanner'
>;
