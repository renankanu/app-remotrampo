/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import React, { useEffect, useState, useCallback } from 'react';
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
  InputSearch,
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

type integer = number;

enum TypeSearch {
  NONE = 'none',
  CATEGORY = 'category',
  TAGS = 'tags',
  COMPANY_NAME = 'company_name',
  SEARCH = 'search',
}

const Job: React.FC = () => {
  const [jobData, setJobData] = useState<Job[]>([]);
  const [search, setSearch] = useState<string>('');
  const [typeSearch, setTypeSearch] = useState<TypeSearch>(TypeSearch.NONE);
  const [limitSearch, setLimitSearch] = useState<integer>(40);
  const navigation = useNavigation();
  useEffect(() => {
    requestRemoteJobs();
  }, []);

  const getLimitSearch = useCallback(() => {
    if (limitSearch > 0) {
      return `?limit=${limitSearch}`;
    }
    return '';
  }, [limitSearch]);

  const getTypeSearch = useCallback(() => {
    if (limitSearch > 0) {
      return `?${typeSearch}=${search}`;
    }
    return '';
  }, [limitSearch]);

  const requestRemoteJobs = useCallback(async () => {
    try {
      const response = await api.get(getTypeSearch() + getLimitSearch());
      setJobData(response.data.jobs);
    } catch (error) {
      Alert.alert(error);
    }
  }, [getLimitSearch]);

  const callJobDetails = useCallback(
    (job: Job) => {
      navigation.navigate('JobDetails', { item: job });
    },
    [navigation],
  );

  return (
    <Container>
      <ContainerSearch animation="fadeInDown">
        <InputSearch
          returnKeyType="search"
          onSubmitEditing={() => requestRemoteJobs()}
          onChangeText={setSearch}
          value={search}
          placeholder="What Pokémon are you looking for?"
        />
      </ContainerSearch>
      <Spacer height={10} />
      <JogList
        data={jobData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ContainerJob
            onPress={() => {
              callJobDetails(item);
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
