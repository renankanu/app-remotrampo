/* eslint-disable camelcase */
import React from 'react';
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Container } from './styles';
import notFound from '../../assets/images/notFound.png';

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
    <Container>
      <Image
        style={{ width: 200, height: 200 }}
        source={
          job.item.company_logo_url
            ? { uri: job.item.company_logo_url }
            : notFound
        }
      />
    </Container>
  );
};

export default JobDetails;
