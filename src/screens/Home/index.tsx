import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Title,
  Description,
  ContainerButton11,
  ContainerButton55,
  ContainerButtonHome,
  Logo,
} from './styles';
import { Spacer } from '../../styles';
import home from '../../assets/images/home.png';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const callJobScren = () => {
    navigation.navigate('Job');
  };

  return (
    <Container>
      <Title>RemoTrampo</Title>
      <Spacer height={10} />
      <Description>Is the easiest to find a job remotely for you</Description>
      <Spacer height={60} />
      <Logo source={home} />
      <Spacer height={60} />
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
