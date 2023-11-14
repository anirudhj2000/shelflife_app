import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';

export type AppStackParams = {
  Home: undefined;
  Scanner: undefined;
};

export interface AuthStackParams extends AppStackParams, ParamListBase {
  Login: undefined;
}

export type AppStackProps = NativeStackScreenProps<AppStackParams>;
export type AuthStackProps = NativeStackScreenProps<AuthStackParams>;
