/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState, useCallback } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
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
} from './styles';
import api from '../../services/api';
import { Spacer } from '../../styles/index';
import notFound from '../../assets/images/notFound.png';
import customColors from '../../styles/customColors';
import ModalLoading from './components/ModalLoading/index';
import ModalOptions from './components/ModalOptions/index';
import { useDispatch, useSelector } from 'react-redux';
import { optionState } from 'src/store/modules/option/types';
import ModalCategories from './components/ModalCategories';
import { categoryState } from '../../store/modules/category/types';

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
  tags = 'tags',
  company_name = 'company_name',
  search = 'search',
}

const Job: React.FC = () => {
  const options = useSelector(
    ({ options: state }: { options: optionState }) => state.options
  );
  const category = useSelector(
    ({ category: state }: { category: categoryState }) => state.category
  );
  const [jobData, setJobData] = useState<Job[]>([]);
  const [categories, setCategories] = useState<Category[]>([{id:19,
    name:'Software Development',
    slug:'software-dev',
  isSelected: false}]);
  const [search, setSearch] = useState<string>('');
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
    setLoading(true);
    try {
      const response = await api.get(`/categories`);
      setCategories(response.data.jobs);
      setIsShowModalCategory(true);
    } catch (error) {
      Alert.alert(error);
    }
    setLoading(false);
  }, []);

  const callRequest = useCallback(() => {
    console.log('TypeSearch', typeSearch);
    console.log('Search', search);
    if (typeSearch === TypeSearch.all) {
      requestRemoteJobs(``);
      return;
    }
    if (typeSearch === TypeSearch.category && search !== '') {
      requestCategories();
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

  const getTypeOption = (name: string | undefined) => {
    for (const enumTypeSearch in TypeSearch) {
      if (name === TypeSearch[enumTypeSearch as TypeSearch]) {
        setTypeSearch(TypeSearch[enumTypeSearch as TypeSearch]);
      }
    }
  };

  const selectOption = () => {
    setIsShowModalOption(false);
  };

  useEffect(() => {
    if (typeSearch === TypeSearch.all) {
      setTimeout(() => {
        requestRemoteJobs('');
        requestCategories();
      }, 500);
    }
  }, [requestRemoteJobs, typeSearch]);

  const validOptionSelected = (option: string | undefined) => {
    console.log('-----', option)
    if(option === 'category'){
      setTimeout(()=>{
        setIsShowModalCategory(true)
      },1000)
    }
  }

  useEffect(()=>{
    const option = options.find(option => {
      return option.isSelected
    })
    setIsShowModalOption(false);
    getTypeOption(option?.name);
    validOptionSelected(option?.name)
  },[options])

  useEffect(()=>{
    setIsShowModalCategory(false)
    console.log('000000', category)
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
        <InputSearch
          returnKeyType="search"
          onSubmitEditing={callRequest}
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
