/* @flow */

import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

const DefaultButton = styled(TouchableOpacity)`
  align-items: center;
  background-color: ${props => props.theme.colors.oldGeranium};
  border-radius: 3px;
  justify-content: center;
  padding: 10px 18px;
`;

const DefaultText = styled(Text)`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.title};
`;

const OutlineButton = styled(TouchableOpacity)`
  align-items: center;
  border-color: ${props => props.theme.colors.oldGeranium};
  border-radius: 3px;
  border-width: 2px;
  justify-content: center;
  padding: 8px 16px;
`;

const OutlineText = styled(Text)`
  color: ${props => props.theme.colors.oldGeranium};
  font-family: ${props => props.theme.fonts.title};
`;

const TransparentButton = styled(TouchableOpacity)`
  align-items: center;
  border-radius: 3px;
  justify-content: center;
  padding: 10px 18px;
`;

const TransparentText = styled(Text)`
  color: ${props => props.theme.colors.oldGeranium};
  font-family: ${props => props.theme.fonts.title};
`;

export const Button = {
  Default: DefaultButton,
  Outline: OutlineButton,
  Transparent: TransparentButton,
};

export const ButtonText = {
  Transparent: TransparentText,
  Default: DefaultText,
  Outline: OutlineText,
};
