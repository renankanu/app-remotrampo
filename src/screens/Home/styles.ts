import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${colors.mischka};
  font-family: 'JosefinSans-Medium';
`;

export const Description = styled.Text`
  font-size: 18px;
  color: ${colors.mischka};
  font-family: 'JosefinSans-Regular';
`;

export const ContainerButton11 = styled.TouchableOpacity`
  padding: 0px 12px;
  border-radius: 18px;
  background: ${colors.transparent11};
`;

export const ContainerButton55 = styled.View`
  padding: 0px 12px 0px 0px;
  border-radius: 18px;
  background: ${colors.transparent55};
`;

export const ContainerButtonHome = styled.View`
  height: 48px;
  width: 80px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
  background: ${colors.white};
`;

export const Logo = styled.Image`
  border-radius: 100px;
  height: 200px;
  width: 200px;
`;
