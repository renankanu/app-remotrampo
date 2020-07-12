import React from 'react';
import {
  Container,
  Title,
  ContainerButton11,
  ContainerButton55,
  ContainerButtonHome,
} from './styles';
import { Spacer } from '../../styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Title>App RemoTrampo</Title>
      <Spacer height={20} />
      <ContainerButton11>
        <ContainerButton55>
          <ContainerButtonHome />
        </ContainerButton55>
      </ContainerButton11>
    </Container>
  );
};

export default Home;
