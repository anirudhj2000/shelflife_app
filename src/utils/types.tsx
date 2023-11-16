import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type AppStackParams = {
  Home: undefined;
  Scanner: undefined;
};

export interface AuthStackParams extends AppStackParams, ParamListBase {
  Login: undefined;
}

export type AppDrawerParams = {
  App: undefined;
};

export type AppDrawerProps = DrawerScreenProps<AppStackParams>;
export type AppStackProps = NativeStackScreenProps<AppStackParams>;
export type AuthStackProps = NativeStackScreenProps<AuthStackParams>;
