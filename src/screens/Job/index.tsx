/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  ContainerSearch,
  JogList,
  ContainerJob,
  ImageJob,
  ContainerDescJob,
  Title,
  CompanyName,
  Category,
  RowFlex,
} from './styles';
import api from '../../services/api';
import { Spacer } from '../../styles/index';
import notFound from '../../assets/images/notFound.png';
import customColors from '../../styles/customColors';

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
  const navigation = useNavigation();
  useEffect(() => {
    const requestRemoteJobs = async () => {
      try {
        const response = await api.get('?limit=10');
        setJobData(response.data.jobs);
      } catch (error) {
        Alert.alert(error);
      }
    };
    requestRemoteJobs();
  }, []);

  const callJobDetails = () => {
    navigation.navigate('JobDetails');
  };

  return (
    <Container>
      <ContainerSearch animation="fadeInDown" />
      <Spacer height={10} />
      <JogList
        data={jobData}
        keyExtractor={job => job.id}
        renderItem={({ item }) => (
          <ContainerJob
            onPress={() => {
              callJobDetails();
            }}
          >
            <ImageJob
              source={
                item.company_logo_url
                  ? { uri: item.company_logo_url }
                  : notFound
              }
            />
            <Spacer width={10} />
            <ContainerDescJob>
              <Title numberOfLines={1}>{item.title}</Title>
              <RowFlex>
                <Icon name="building" size={16} color={customColors.white} />
                <Spacer width={8} />
                <CompanyName numberOfLines={1}>{item.company_name}</CompanyName>
              </RowFlex>
              <RowFlex>
                <Icon name="suitcase" size={16} color={customColors.white} />
                <Spacer width={8} />
                <Category numberOfLines={1}>{item.category}</Category>
              </RowFlex>
            </ContainerDescJob>
          </ContainerJob>
        )}
      />
    </Container>
  );
};

export default Job;
