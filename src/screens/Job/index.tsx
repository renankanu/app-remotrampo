/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Container, ContainerSearch } from './styles';
import api from '../../services/api';

interface Job {
  id: string;
  url: string;
  title: string;
  company_name: string;
  category: string;
  tags: Array<string>;
  job_type: string;
  publication_date: string;
  candidate_required_location: string;
  salary: string;
  description: string;
}

const Job: React.FC = () => {
  const [data, setData] = useState<Job[]>([]);
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

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container>
      <ContainerSearch animation="fadeInDown" />
    </Container>
  );
};

export default Job;
