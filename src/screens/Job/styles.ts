import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import customColors from '../../styles/customColors';

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const ContainerSearch = styled(Animatable.View)`
  height: 48px;
  margin: 20px 20px 0px 20px;
  border-radius: 12px;
  background: ${customColors.shipGray};
`;

export const Logo = styled(Animatable.Image)`
  border-radius: 100px;
  height: 200px;
  width: 200px;
`;
