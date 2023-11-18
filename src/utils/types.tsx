import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import type {CompositeScreenProps} from '@react-navigation/native';
import {NavigatorScreenParams} from '@react-navigation/native';
import {DrawerScreenProps} from '@react-navigation/drawer';

export type AppStackParams = {
  Home: undefined;
  Scanner: undefined;
};

export type AppDrawerParams = {
  App: NavigatorScreenParams<AppStackParams>;
};

export type AuthStackParams = {
  Login: undefined;
  App: NavigatorScreenParams<AppStackParams>;
};

export type AuthStackProps = NativeStackScreenProps<AuthStackParams>;
export type AppStackProps = NativeStackScreenProps<AppDrawerParams>;

export type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AppDrawerParams>,
  DrawerScreenProps<AppStackParams>
>;
