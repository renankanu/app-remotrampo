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

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContainerColumn = styled.View`
  width: 48%;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  height: 46px;
`;

export const BackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
`;

export const TitleHeaderContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const Label = styled.Text`
  color: ${customColors.mischka};
  font-family: 'JosefinSans-Light';
  margin-bottom: ${Platform.OS === 'android' ? '0px' : '8px'};
`;

export const TitleHeader = styled.Text`
  font-size: 24px;
  color: ${customColors.mischka};
  font-family: 'JosefinSans-Medium';
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 36px;
  color: ${customColors.mischka};
  font-family: 'JosefinSans-Medium';
`;

export const Info = styled.Text`
  font-size: 16px;
  color: ${customColors.mischka};
  font-family: 'JosefinSans-Medium';
`;
