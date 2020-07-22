import styled from 'styled-components/native';
import customColors from '../../../../styles/customColors';

export const Container = styled.View`
  border-radius: 22px;
  padding: 22px;
  background: ${customColors.shipGray};
  width: 100%;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: ${customColors.white};
  font-family: 'JosefinSans-Medium';
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${customColors.white};
  font-family: 'JosefinSans-Light';
`;

export const ButtonSelect = styled.TouchableOpacity`
  background:${customColors.carnation};
  justify-content: center;
  margin-bottom: 10px;
`;
