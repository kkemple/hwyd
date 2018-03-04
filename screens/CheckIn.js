import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { LinearGradient, Constants } from 'expo';
import { Entypo } from '@expo/vector-icons';

import { Button, ButtonText } from '../components';

const ButtonsContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ParagraphText = styled(Text)`
  font-family: ${props => props.theme.fonts.regular};
`;

const Title = styled(Text)`
  font-family: ${props => `${props.theme.fonts.title}`};
  font-size: 48;
  margin-bottom: 24;
  text-align: center;
`;

const Background = styled(LinearGradient)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export default class CheckIn extends Component {
  state = {
    date: new Date(),
  };

  render() {
    return (
      <Container>
        <Background colors={['#f8a5c2', '#f7d794']} />

        <Title>How was your day?</Title>

        <ButtonsContainer>
          <Button.Transparent style={{ marginRight: 8 }}>
            <ButtonText.Transparent>
              <Entypo size={98} name="emoji-happy" />
            </ButtonText.Transparent>
          </Button.Transparent>

          <Button.Transparent onPress={() => {}}>
            <ButtonText.Transparent>
              <Entypo size={98} name="emoji-sad" />
            </ButtonText.Transparent>
          </Button.Transparent>
        </ButtonsContainer>
      </Container>
    );
  }
}
