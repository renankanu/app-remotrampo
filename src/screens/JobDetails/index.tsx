import React from 'react';
import { Linking, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import HTML from 'react-native-render-html';

import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  CompanyImage,
  ContainerCenter,
  Label,
  Info,
  ScrollView,
  Row,
  ContainerColumn,
  Header,
  BackButton,
  TitleHeaderContainer,
  TitleHeader,
} from './styles';
import notFound from '../../assets/images/notFound.png';
import { Spacer } from '../../styles/index';
import { tagsStyles } from './tagHtmlStyles';
import customColors from '../../styles/customColors';

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
  const navigation = useNavigation();
  const job = route.params as RouteParams;

  const verifySalary = () => {
    if (job.item.salary === '') {
      return 'Uninformed';
    }
    return job.item.salary;
  };

  const callGoBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={callGoBack}>
          <Icon name="chevron-left" size={24} color={customColors.white} />
        </BackButton>
        <TitleHeaderContainer>
          <TitleHeader>Job Details</TitleHeader>
        </TitleHeaderContainer>
      </Header>
      <ScrollView>
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
        <Row>
          <ContainerColumn>
            <Label>Company Name</Label>
            <Info>{job.item.company_name}</Info>
          </ContainerColumn>
          <ContainerColumn>
            <Label>category</Label>
            <Info>{job.item.category}</Info>
          </ContainerColumn>
        </Row>
        <Spacer height={24} />
        <Row>
          <ContainerColumn>
            <Label>Type</Label>
            <Info>{job.item.job_type}</Info>
          </ContainerColumn>
          <ContainerColumn>
            <Label>Publication Date</Label>
            <Info>{job.item.publication_date}</Info>
          </ContainerColumn>
        </Row>
        <Spacer height={24} />
        <Row>
          <ContainerColumn>
            <Label>Location</Label>
            <Info>{job.item.candidate_required_location}</Info>
          </ContainerColumn>
          <ContainerColumn>
            <Label>Salary</Label>
            <Info>{verifySalary()}</Info>
          </ContainerColumn>
        </Row>
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
      </ScrollView>
    </Container>
  );
};

export default JobDetails;
