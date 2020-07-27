/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useCallback } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
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
  ContainerInput,
  ContainerNoData
} from './styles';
import api from '../../services/api';
import { Spacer } from '../../styles/index';
import notFound from '../../assets/images/notFound.png';
import customColors from '../../styles/customColors';
import ModalLoading from './components/ModalLoading/index';
import ModalOptions from './components/ModalOptions/index';
import { useSelector } from 'react-redux';
import { optionState } from 'src/store/modules/option/types';
import ModalCategories from './components/ModalCategories';
import { categoryState } from '../../store/modules/category/types';
import { Text } from 'react-native';
import { NoDataMessage } from './styles';

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

export interface Category {
  id: number;
  name: string;
  slug: string;
  isSelected: boolean;
}

export interface Option {
  id: number;
  name: TypeSearch;
  isSelected: boolean;
}

enum TypeSearch {
  all = 'all',
  category = 'category',
  company_name = 'company name',
}

const Job: React.FC = () => {
  const options = useSelector(
    ({ options: state }: { options: optionState }) => state.options
  );
  const category = useSelector(
    ({ category: state }: { category: categoryState }) => state.category
  );
  const [jobData, setJobData] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('Search ...');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isShowModalOption, setIsShowModalOption] = useState<boolean>(false);
  const [isShowModalCategory, setIsShowModalCategory] = useState<boolean>(false);
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

  const requestCategories = useCallback(async () => {
    try {
      const response = await api.get(`/categories`);
      setCategories(response.data.jobs);
    } catch (error) {
      Alert.alert(error);
    }
  }, []);

  const callRequest = useCallback(async () => {
    if (typeSearch === TypeSearch.all && search !== '') {
      await requestRemoteJobs(`?search=${search}`);
      return;
    }
    if (typeSearch === TypeSearch.company_name && search !== '') {
      await requestRemoteJobs(`?company_name=${search}`);
      return;
    }
    await requestRemoteJobs(``);
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

  const getTypeOption = (name: string | undefined) => {
    for (const enumTypeSearch in TypeSearch) {
      if (name === Object(TypeSearch)[enumTypeSearch]) {
        setTypeSearch(Object(TypeSearch)[enumTypeSearch]);
      }
    }
  };

  const selectOption = () => {
    setIsShowModalOption(false);
  };

  useEffect(()=>{
    if(search.trim() ===''){
      callRequest()
    }
  },[search])

  useEffect(() => {
    if (typeSearch === TypeSearch.all) {
      setTimeout(() => {
        requestRemoteJobs('');
      }, 500);
    }
  }, [requestRemoteJobs, typeSearch]);

  useEffect(() => {
    requestCategories()
  }, [requestCategories]);

  const validOptionSelected = (option: string | undefined) => {
    if(option === TypeSearch.all){
      setPlaceholder('Search ...')
    }
    if(option === TypeSearch.category){
      setTimeout(()=>{
        setIsShowModalCategory(true)
      },600)
    }
    if(option === TypeSearch.company_name){
      setPlaceholder('Company name ...')
    }
  }

  useEffect(()=>{
    setSearch('')
    const option = options.find(option => {
      return option.isSelected
    })
    setIsShowModalOption(false);
    getTypeOption(option?.name);
    validOptionSelected(option?.name)
  },[options])

  useEffect(()=>{
    if(category !== ''){
      setIsShowModalCategory(false)
      setTimeout(()=>{
        requestRemoteJobs(`?category=${category}`);
      }, 600)
    }
  },[category])

  return (
    <Container>
      <ModalLoading isLoading={isLoading} />
      <ModalOptions
        isShowModalOption={isShowModalOption}
        doClose={() => {
          setIsShowModalOption(false);
        }}
        options={options}
        onPress={selectOption}
      />
      <ModalCategories isLoading={isShowModalCategory} categories={categories} />

      <ContainerSearch animation="fadeInDown">
        <ContainerInput>
        <InputSearch
          returnKeyType="search"
          onSubmitEditing={callRequest}
          onChangeText={text => {
            setSearch(text);
          }}
          selectionColor={customColors.white}
          placeholderTextColor={customColors.mischka}
          value={search}
          placeholder={placeholder}
        />
        </ContainerInput>
        <TouchableOpacity onPress={openModalOption}>
          <Icon name="filter" size={16} color={customColors.white} />
        </TouchableOpacity>
      </ContainerSearch>
      <Spacer height={10} />
      {jobData.length > 0 ? (
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
      ) : (
        <ContainerNoData>
          <NoDataMessage>Try again ...</NoDataMessage>
          <Spacer width={8}/>
          <Emoji name="grimacing" style={{ fontSize: 18 }} />
        </ContainerNoData>
      )}
    </Container>
  );
};

export default Job;
