/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Linking, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import HTML from 'react-native-render-html';
import moment from 'moment';

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
  Title,
  Button,
  LabelButton,
  Tag,
  TagLabel,
} from './styles';
import notFound from '../../assets/images/notFound.png';
import { Spacer } from '../../styles/index';
import { tagsStyles } from './tagHtmlStyles';
import customColors from '../../styles/customColors';
import { Text } from 'react-native';
import { View } from 'react-native';

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

  const formatDate = () => {
    return moment(job.item.publication_date).format('YYYY-MM-DD');
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
        <BackButton />
      </Header>
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
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
        <Spacer height={24} />
        <Title>{job.item.title}</Title>
        <Spacer height={36} />
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
            <Info>{formatDate()}</Info>
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
        {job.item.tags.length > 0 && (
          <>
            <Label>Tag</Label>
            {job.item.tags.map((tag, i) => {
              return (
                <Tag key={i}>
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              );
            })}
          </>
        )}
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
            'background-color',
          ]}
          listsPrefixesRenderers={{
            ul: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => {
              return <View style={{
                marginRight: 10,
                width: 12 / 2.8,
                height: 12 / 2.8,
                marginTop: 12 / 2,
                borderRadius: 12 / 2.8,
                backgroundColor: customColors.carnation,
              }}/>
            },
          }}
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
        <Button>
          <LabelButton
            onPress={() => {
              Linking.canOpenURL(job.item.url).then(supported => {
                if (supported) {
                  Linking.openURL(job.item.url);
                }
              });
            }}
          >
            See Job
          </LabelButton>
        </Button>
        <Spacer height={24} />
      </ScrollView>
    </Container>
  );
};

export default JobDetails;
