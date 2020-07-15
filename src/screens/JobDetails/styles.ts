import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import customColors from '../../styles/customColors';

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Container = styled(SafeAreaView)`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

export const ContainerCenter = styled.View`
  align-items: center;
`;

export const CompanyImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 260px;
`;

export const Label = styled.Text`
  color: ${customColors.mischka};
  font-family: 'JosefinSans-Light';
  margin-bottom: ${Platform.OS === 'android' ? '0px' : '8px'};
`;
export const Info = styled.Text`
  font-size: 16px;
  color: ${customColors.mischka};
  font-family: 'JosefinSans-Medium';
`;
