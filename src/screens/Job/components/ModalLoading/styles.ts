import styled from 'styled-components/native';
import customColors from '../../../../styles/customColors';

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

export const Title = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${customColors.white};
  font-family: 'JosefinSans-Medium';
`;
