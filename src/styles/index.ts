import styled from 'styled-components/native';
import { ViewProps } from 'react-native';

interface IBoxProps extends ViewProps {
  height?: number;
  width?: number;
}

export const Spacer = styled.View<IBoxProps>`
  ${props =>
    props.height &&
    `
    height: ${props.height}px;
  `}
  ${props =>
    props.width &&
    `
    height: ${props.width}px;
  `}
`;
