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
  AnimatableContainerButton,
} from './styles';
import { Spacer } from '../../styles';
import home from '../../assets/images/home.png';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const callJobScreen = () => {
    navigation.navigate('Job');
  };

  return (
    <Container>
      <Title useNativeDriver animation="fadeInRight">RemoTrampo</Title>
      <Spacer height={10} />
      <Description useNativeDriver animation="fadeInRight" delay={500}>Is the easiest to find a job remotely for you</Description>
      <Spacer height={60} />
      <Logo source={home} animation="rubberBand" />
      <Spacer height={60} />
      <AnimatableContainerButton useNativeDriver animation="fadeInRight" delay={1000}>
      <ContainerButton11 onPress={callJobScreen}>
        <ContainerButton55>
          <ContainerButtonHome>
            <Icon name="arrow-right" size={30} color="#000" />
          </ContainerButtonHome>
        </ContainerButton55>
      </ContainerButton11>
      </AnimatableContainerButton>
    </Container>
  );
};

export default Home;
