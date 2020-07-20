import styled from 'styled-components/native';
import customColors from '../../../../styles/customColors';

export const ContainerOption = styled.View`
  padding: 30px 20px 20px 20px;
  width: 100%;
  background: ${customColors.bastille};
`;

export const ContainerTitleModalOption = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const TitleModalOption = styled.Text`
  color: ${customColors.white};
  text-align: center;
  font-size: 18px;
  font-family: 'JosefinSans-Medium';
`;

export const LabelOption = styled.Text`
  color: ${customColors.white};
  font-size: 16px;
  font-family: 'JosefinSans-Medium';
`;

export const ButtonOption = styled.TouchableOpacity`
  margin: 0px 10px 10px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  height: 48px;
  border-radius: 12px;
  background: ${customColors.carnation};
`;
