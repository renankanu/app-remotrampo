import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native';
import customColors from '../../styles/customColors';
import { Job } from './index';

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const ContainerSearch = styled(Animatable.View)`
  height: 48px;
  margin: 20px 20px 0px 20px;
  border-radius: 12px;
  background: ${customColors.shipGray};
`;

export const ContainerJob = styled.TouchableOpacity`
  margin: 0px 10px 10px 10px;
  flex-direction: row;
  padding: 20px 20px 20px 20px;
  border-radius: 12px;
  background: ${customColors.bastille};
`;

export const ImageJob = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${customColors.white};
  font-family: 'JosefinSans-Medium';
`;

export const JogList = styled(FlatList as new () => FlatList<Job>)``;

export const Logo = styled(Animatable.Image)`
  border-radius: 100px;
  height: 200px;
  width: 200px;
`;
