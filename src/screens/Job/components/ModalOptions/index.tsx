import React from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-modal';
import Emoji from 'react-native-emoji';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Spacer } from '../../../../styles/index';
import {
  ContainerOption,
  ButtonOption,
  LabelOption,
  TitleModalOption,
  ContainerTitleModalOption,
} from './styles';
import { Option } from '../../index';
import customColors from '../../../../styles/customColors';

interface IProps {
  isShowModalOption: boolean;
  doClose: () => void;
  options: Option[];
  onPress: (option: Option) => void;
}

const ModalOptions: React.FC<IProps> = ({
  isShowModalOption,
  doClose,
  options,
  onPress,
}: IProps) => {
  const onSubmit = (option: Option) => {
    onPress(option);
  };
  return (
    <Modal
      isVisible={isShowModalOption}
      animationIn="rubberBand"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={500}
      backdropTransitionOutTiming={500}
      onSwipeComplete={doClose}
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
                onSubmit(option);
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
  );
};

export default ModalOptions;
