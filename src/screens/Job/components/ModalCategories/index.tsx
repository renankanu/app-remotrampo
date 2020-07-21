import React from 'react'
import Modal from 'react-native-modal';
import {Category} from '../../index'
import { Container, Label, Title } from './styles';
import { Spacer } from '../../../../styles';

interface IProps {
  isLoading: boolean;
  categories: Category[];
}

const ModalCategories: React.FC<IProps> = ({isLoading, categories}: IProps) => {
  console.log('---', categories)
  return (
    <Modal
      isVisible
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
    >
      <Container>
        <Title>Choose category</Title>
        <Spacer height={20}/>
        {categories.map(category => {
          return(<>
          <Label>{category.name}</Label>
          <Spacer height={12}/>
          </>)
        })}
      </Container>
    </Modal>
  )
}

export default ModalCategories
