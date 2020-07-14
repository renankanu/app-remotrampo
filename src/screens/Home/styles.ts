import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import customColors from '../../styles/customColors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${customColors.mischka};
  font-family: 'JosefinSans-Medium';
`;

export const Description = styled.Text`
  font-size: 18px;
  color: ${customColors.mischka};
  font-family: 'JosefinSans-Regular';
`;

export const ContainerButton11 = styled.TouchableOpacity`
  padding: 0px 12px;
  border-radius: 18px;
  background: ${customColors.transparent11};
`;

export const ContainerButton55 = styled.View`
  padding: 0px 12px 0px 0px;
  border-radius: 18px;
  background: ${customColors.transparent55};
`;

export const ContainerButtonHome = styled.View`
  height: 48px;
  width: 80px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  background: ${customColors.white};
`;

export const Logo = styled(Animatable.Image)`
  border-radius: 100px;
  height: 200px;
  width: 200px;
`;
