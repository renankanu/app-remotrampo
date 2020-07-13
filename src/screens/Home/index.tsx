import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  ContainerButton11,
  ContainerButton55,
  ContainerButtonHome,
} from './styles';
import { Spacer } from '../../styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const callJobScren = () => {
    navigation.navigate('Job');
  };

  return (
    <Container>
      <Title>App RemoTrampo</Title>
      <Spacer height={20} />
      <ContainerButton11 onPress={callJobScren}>
        <ContainerButton55>
          <ContainerButtonHome>
            <Icon name="arrow-right" size={30} color="#000" />
          </ContainerButtonHome>
        </ContainerButton55>
      </ContainerButton11>
    </Container>
  );
};

export default Home;
