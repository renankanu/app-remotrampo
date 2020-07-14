/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Text, Image, View } from 'react-native';
import {
  Container,
  ContainerSearch,
  JogList,
  ContainerJob,
  ImageJob,
  Title,
} from './styles';
import api from '../../services/api';
import { Spacer } from '../../styles/index';
import notFound from '../../assets/images/notFound.png';

export interface Job {
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
  company_logo_url: string;
}

const Job: React.FC = () => {
  const [jobData, setJobData] = useState<Job[]>([]);
  useEffect(() => {
    const requestRemoteJobs = async () => {
      try {
        const response = await api.get('?limit=10');
        setJobData(response.data.jobs);
      } catch (error) {
        console.log('Error');
      }
    };
    requestRemoteJobs();
  }, []);

  return (
    <Container>
      <ContainerSearch animation="fadeInDown" />
      <Spacer height={10} />
      <JogList
        data={jobData}
        keyExtractor={job => job.id}
        renderItem={({ item }) => (
          <ContainerJob onPress={() => {}}>
            <ImageJob
              source={
                item.company_logo_url
                  ? { uri: item.company_logo_url }
                  : notFound
              }
            />
            <View>
              <Title>{item.title}</Title>
            </View>
          </ContainerJob>
        )}
      />
    </Container>
  );
};

export default Job;
