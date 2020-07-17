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
  flex-direction: row;
  padding: 0px 27px;
  margin: 20px 10px 0px 10px;
  align-items: center;
  border-radius: 10px;
  background: ${customColors.shipGray};
`;
export const InputSearch = styled.TextInput`
  margin-left: 12px;
  height: 100%;
  width: 100%;
`;

export const ContainerLoading = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Loading = styled.View`
  height: 200px;
  width: 200px;
  background: ${customColors.bastille};
  border-radius: 26px;
  justify-content: center;
  align-items: center;
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

export const ContainerDescJob = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const RowFlex = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${customColors.white};
  font-family: 'JosefinSans-Medium';
`;

export const CompanyName = styled.Text`
  flex: 1;
  color: ${customColors.white};
  font-size: 16px;
  font-family: 'JosefinSans-Light';
`;

export const Category = styled.Text`
  flex: 1;
  color: ${customColors.white};
  font-size: 16px;
  font-family: 'JosefinSans-Light';
`;

export const JogList = styled(FlatList as new () => FlatList<Job>)``;

export const Logo = styled(Animatable.Image)`
  border-radius: 100px;
  height: 200px;
  width: 200px;
`;
