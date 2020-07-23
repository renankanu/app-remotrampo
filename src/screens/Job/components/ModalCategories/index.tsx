import React from 'react'
import Modal from 'react-native-modal';
import {Category} from '../../index'
import { Container, Label, Title, ButtonSelect } from './styles';
import { useDispatch } from 'react-redux';
import { Spacer } from '../../../../styles';
import { setCategory } from '../../../../store/modules/category/actions';

interface IProps {
  isLoading: boolean;
  categories: Category[];
}

const ModalCategories: React.FC<IProps> = ({isLoading, categories}: IProps) => {
  const dispatch = useDispatch()
  return (
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
    <Container>
    <Title>Choose category</Title>
    <Spacer height={20}/>
    {categories.map((category, index) => {
      return(
        <ButtonSelect key={index} onPress={()=>{
          dispatch(setCategory(category.slug))
        }}>
        <Label>{category.name}</Label>
        </ButtonSelect>
        )
      })}
      </Container>
      </Modal>
      )
    }

    export default ModalCategories
