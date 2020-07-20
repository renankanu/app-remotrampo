/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useCallback } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import Emoji from 'react-native-emoji';
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
  ContainerOption,
  ButtonOption,
  LabelOption,
  TitleModalOption,
  ContainerTitleModalOption,
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

export interface Option {
  id: number;
  name: TypeSearch;
  isSelected: boolean;
}

enum TypeSearch {
  all = 'all',
  category = 'category',
  tags = 'tags',
  company_name = 'company_name',
  search = 'search',
}

const Job: React.FC = () => {
  const [jobData, setJobData] = useState<Job[]>([]);
  const [options, setOptions] = useState<Option[]>([
    {
      id: 5,
      name: TypeSearch.all,
      isSelected: false,
    },
    {
      id: 1,
      name: TypeSearch.category,
      isSelected: false,
    },
    {
      id: 2,
      name: TypeSearch.tags,
      isSelected: false,
    },
    {
      id: 3,
      name: TypeSearch.company_name,
      isSelected: false,
    },
    {
      id: 4,
      name: TypeSearch.search,
      isSelected: false,
    },
  ]);
  const [search, setSearch] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isShowModalOption, setIsShowModalOption] = useState<boolean>(false);
  const [typeSearch, setTypeSearch] = useState<TypeSearch>(TypeSearch.all);
  const navigation = useNavigation();

  const requestRemoteJobs = useCallback(async params => {
    setLoading(true);
    try {
      const response = await api.get(`${params}`);
      setJobData(response.data.jobs);
    } catch (error) {
      Alert.alert(error);
    }
    setLoading(false);
  }, []);

  const validTypeSearch = useCallback(() => {
    console.log('TypeSearch', typeSearch);
    console.log('Search', search);
    if (typeSearch !== TypeSearch.all && search !== '') {
      requestRemoteJobs(`?${typeSearch}=${search}`);
      return;
    }
    if (typeSearch !== TypeSearch.category && search !== '') {
      requestRemoteJobs(`?${typeSearch}=${search}`);
      return;
    }
    requestRemoteJobs(``);
  }, [typeSearch, search, requestRemoteJobs]);

  const callJobDetails = useCallback(
    (job: Job) => {
      navigation.navigate('JobDetails', { item: job });
    },
    [navigation],
  );

  const openModalOption = () => {
    setIsShowModalOption(true);
  };

  const getTypeOption = (name: string) => {
    for (const enumTypeSearch in TypeSearch) {
      if (name === TypeSearch[enumTypeSearch as TypeSearch]) {
        setTypeSearch(TypeSearch[enumTypeSearch as TypeSearch]);
      }
    }
  };

  const selectOption = (option: Option) => {
    setIsShowModalOption(false);
    const newArrayOptions = options.map(optionItem => {
      return optionItem.id === option.id
        ? { ...optionItem, isSelected: true }
        : { ...optionItem, isSelected: false };
    });
    getTypeOption(option.name);
    setOptions(newArrayOptions);
  };

  useEffect(() => {
    if (typeSearch === TypeSearch.all) {
      setTimeout(() => {
        requestRemoteJobs('');
      }, 500);
    }
  }, [requestRemoteJobs, typeSearch]);

  return (
    <Container>
      <Modal
        isVisible={isLoading}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
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

      <Modal
        isVisible={isShowModalOption}
        animationIn="rubberBand"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={500}
        backdropTransitionOutTiming={500}
        onSwipeComplete={() => {
          setIsShowModalOption(false);
        }}
        swipeDirection={['down']}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <ContainerOption>
          <ContainerTitleModalOption>
            <TitleModalOption>Filter</TitleModalOption>
            <Spacer width={8} />
            <Emoji name="mag_right" style={{ fontSize: 18 }} />
          </ContainerTitleModalOption>
          <Spacer height={28} />
          {options.map(option => {
            return (
              <ButtonOption
                onPress={() => {
                  selectOption(option);
                }}
              >
                <LabelOption>{option.name}</LabelOption>
                {option.isSelected && (
                  <Icon name="check" size={16} color={customColors.white} />
                )}
              </ButtonOption>
            );
          })}
        </ContainerOption>
      </Modal>

      <ContainerSearch animation="fadeInDown">
        <InputSearch
          returnKeyType="search"
          onSubmitEditing={validTypeSearch}
          onChangeText={text => {
            console.log(text);
            setSearch(text);
          }}
          selectionColor={customColors.white}
          placeholderTextColor={customColors.mischka}
          value={search}
          placeholder="Search Job"
        />
        <TouchableOpacity onPress={openModalOption}>
          <Icon name="filter" size={16} color={customColors.white} />
        </TouchableOpacity>
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
