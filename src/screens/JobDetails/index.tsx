/* eslint-disable camelcase */
import React from 'react';
import { useRoute } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import { Dimensions } from 'react-native';
import {
  Container,
  CompanyImage,
  ContainerCenter,
  Label,
  Info,
  ScrollView,
} from './styles';
import notFound from '../../assets/images/notFound.png';
import { Spacer } from '../../styles/index';

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
  company_logo_url: string;
}

interface RouteParams {
  item: Job;
}

const tagsStyles = {
  div: {
    color: '#FFF',
    margin: 10,
  },
  span: {
    color: '#FFF',
  },
  p: {
    color: '#FFF',
    margin: 10,
  },
  h1: {
    color: '#FFF',
    margin: 10,
  },
  h2: {
    color: '#FFF',
    margin: 10,
  },
  li: {
    color: '#FFF',
  },
  ol: {
    color: '#FFF',
  },
  ul: {
    color: '#FFF',
  },
};

const JobDetails: React.FC = () => {
  const route = useRoute();
  const job = route.params as RouteParams;

  console.log('-----', job.item.description);

  return (
    <ScrollView>
      <Container>
        <ContainerCenter>
          <CompanyImage
            resizeMode="contain"
            source={
              job.item.company_logo_url
                ? { uri: job.item.company_logo_url }
                : notFound
            }
          />
        </ContainerCenter>
        <Label>Title</Label>
        <Info>{job.item.title}</Info>
        <Spacer height={24} />
        <Label>Company Name</Label>
        <Info>{job.item.company_name}</Info>
        <Spacer height={24} />
        <Label>category</Label>
        <Info>{job.item.category}</Info>
        <Spacer height={24} />
        <Label>Description</Label>
        <HTML
          html={job.item.description}
          tagsStyles={tagsStyles}
          ignoredStyles={[
            'font-family',
            'line-height',
            'color',
            'margin-top',
            'margin-bottom',
          ]}
          baseFontStyle={{ fontFamily: 'JosefinSans-Light' }}
          imagesMaxWidth={Dimensions.get('window').width}
        />
        <Spacer height={24} />
      </Container>
    </ScrollView>
  );
};

export default JobDetails;
