import React, { useEffect, useState } from 'react';
import { Container, ContainerSearch } from './styles';
import api from '../../services/api';

const Job: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const requestRemoteJobs = async () => {
      try {
        const response = await api.get('/');
        setData(response.data);
      } catch (error) {
        console.log('Error');
      }
    };
    requestRemoteJobs();
  }, []);

  return (
    <Container>
      <ContainerSearch animation="fadeInDown" />
    </Container>
  );
};

export default Job;
