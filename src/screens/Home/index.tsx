import React from 'react';
import {
  Container,
  Title,
  ContainerButton11,
  ContainerButton55,
  ContainerButtonHome,
} from './styles';

const Home: React.FC = () => {
  return (
    <Container>
      <Title>App RemoTrampo</Title>
      <ContainerButton11>
        <ContainerButton55>
          <ContainerButtonHome />
        </ContainerButton55>
      </ContainerButton11>
    </Container>
  );
};

export default Home;
