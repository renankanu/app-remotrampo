/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import React, { useEffect, useState, useCallback } from 'react';
import { Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
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
  Loading,
  ContainerLoading,
} from './styles';
import api from '../../services/api';
import { Spacer } from '../../styles/index';
import notFound from '../../assets/images/notFound.png';
import customColors from '../../styles/customColors';
import loadingLottie from '../../assets/lottie/loading.json';

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

enum TypeSearch {
  NONE = 'none',
  CATEGORY = 'category',
  TAGS = 'tags',
  COMPANY_NAME = 'company_name',
  SEARCH = 'search',
}

const Job: React.FC = () => {
  const [jobData, setJobData] = useState<Job[]>([]);
  const [search, setSearch] = useState<string>('front');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [typeSearch, setTypeSearch] = useState<TypeSearch>(TypeSearch.NONE);
  const navigation = useNavigation();

  const getTypeSearch = useCallback(() => {
    if (typeSearch !== TypeSearch.NONE && search !== '') {
      return `?${typeSearch}=${search}`;
    }
    return '';
  }, [typeSearch, search]);

  const requestRemoteJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(getTypeSearch());
      setJobData(response.data.jobs);
    } catch (error) {
      Alert.alert(error);
    }
    setLoading(false);
  }, [getTypeSearch]);

  const callJobDetails = useCallback(
    (job: Job) => {
      navigation.navigate('JobDetails', { item: job });
    },
    [navigation],
  );

  useEffect(() => {
    requestRemoteJobs();
  }, [requestRemoteJobs]);

  return (
    <Container>
      <Modal
        isVisible={isLoading}
        animationIn="slideInUp"
        animationOut="bounceOut"
        backdropOpacity={0.5}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={1000}
      >
        <ContainerLoading>
          <Loading>
            <LottieView
              style={{ height: 100, width: 100 }}
              source={loadingLottie}
              autoPlay
              loop
            />
            <Title>looking for jobs...</Title>
          </Loading>
        </ContainerLoading>
      </Modal>

      <ContainerSearch animation="fadeInDown">
        <InputSearch
          returnKeyType="search"
          onSubmitEditing={() => requestRemoteJobs()}
          onChangeText={setSearch}
          value={search}
          placeholder="Search Job"
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
