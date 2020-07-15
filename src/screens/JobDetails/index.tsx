import React from 'react';
import { Linking, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HTML from 'react-native-render-html';

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
import { tagsStyles } from './tagHtmlStyles';

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

const JobDetails: React.FC = () => {
  const route = useRoute();
  const job = route.params as RouteParams;

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
          imagesMaxWidth={Dimensions.get('window').width - 48}
          onLinkPress={(object, href) => {
            Linking.canOpenURL(href).then(supported => {
              if (supported) {
                Linking.openURL(href);
              }
            });
          }}
        />
        <Spacer height={24} />
      </Container>
    </ScrollView>
  );
};

export default JobDetails;
