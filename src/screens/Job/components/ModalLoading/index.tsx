import React from 'react';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { ContainerLoading, Loading, Title } from './styles';
import loadingLottie from '../../../../assets/lottie/loading.json';

interface IProps {
  isLoading: boolean;
}

const ModalLoading: React.FC<IProps> = ({ isLoading }: IProps) => {
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
      <ContainerLoading>
        <Loading>
          <LottieView
            style={{ height: 100, width: 100 }}
            source={loadingLottie}
            autoPlay
            loop
          />
          <Title>looking for jobs...</Title>
        </Loading>
      </ContainerLoading>
    </Modal>
  );
};

export default ModalLoading;
