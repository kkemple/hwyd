/* @flow */

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import { LinearGradient, Constants } from 'expo';
import { Entypo } from '@expo/vector-icons';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import type {
  NavigationScreenProp,
  NavigationStateRoute,
} from 'react-navigation';

import { Button, ButtonText, Done, Loader } from '../components';
import { getCheckIns, addCheckIn } from '../utils/actions';
import { ROGUE_PINK, ROSY_HIGHLIGHT } from '../utils/constants';
import type { CheckInData } from '../utils/types';

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>,
};

type State = {
  isToday: boolean,
  loading: boolean,
  hasCheckInForToday: boolean,
  date: string,
  displayDate: ?string,
};

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
  font-size: 40;
  margin-bottom: 36;
  text-align: center;
`;

const DisplayDate = styled(Text)`
  font-family: ${props => `${props.theme.fonts.subtitle}`};
  font-size: 24;
  margin-bottom: 16;
  text-align: center;
`;

const Background = styled(LinearGradient)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const BackButton = styled(Button.Transparent)`
  position: absolute;
  top: 32;
  left: -8;
`;

export default class CheckIn extends Component<Props, State> {
  state = {
    isToday: !this.props.navigation.state.params,
    loading: true,
    hasCheckInForToday: false,
    date: this.props.navigation.state.params
      ? this.props.navigation.state.params.date.dateString
      : format(new Date(), 'YYYY-MM-DD'),
    displayDate: this.props.navigation.state.params
      ? format(
          parse(this.props.navigation.state.params.date.dateString),
          'MMMM Do, YYYY',
        )
      : undefined,
  };

  componentWillMount = async () => {
    const checkIns = await getCheckIns();
    const todaysCheckIn = checkIns.find(c => c.date === this.state.date);

    this.setState(() => ({
      loading: false,
      hasCheckInForToday: !!todaysCheckIn,
    }));
  };

  render() {
    return this.state.loading ? (
      <Container>
        <Loader style={{ width: 100, height: 100 }} />
      </Container>
    ) : this.state.hasCheckInForToday ? (
      <Container>
        <Background colors={[ROGUE_PINK, ROSY_HIGHLIGHT]} />

        {!this.state.isToday && (
          <BackButton onPress={() => this.props.navigation.pop()}>
            <Entypo size={24} name="chevron-thin-left" />
          </BackButton>
        )}

        {!this.state.isToday && (
          <DisplayDate>{this.state.displayDate}</DisplayDate>
        )}

        <Title>Another Day Recorded!</Title>

        <Done style={{ width: 200, height: 200 }} />
      </Container>
    ) : (
      <Container>
        <Background colors={[ROGUE_PINK, ROSY_HIGHLIGHT]} />

        {!this.state.isToday && (
          <BackButton onPress={() => this.props.navigation.pop()}>
            <Entypo size={24} name="chevron-thin-left" />
          </BackButton>
        )}

        {!this.state.isToday && (
          <DisplayDate>{this.state.displayDate}</DisplayDate>
        )}

        <Title>How was your day?</Title>

        <ButtonsContainer>
          <Button.Transparent
            style={{ marginRight: 8 }}
            onPress={async () => {
              await addCheckIn({
                date: this.state.date,
                result: 'GOOD',
              });
              this.setState(() => ({ hasCheckInForToday: true }));
            }}
          >
            <ButtonText.Transparent>
              <Entypo size={98} name="emoji-happy" />
            </ButtonText.Transparent>
          </Button.Transparent>

          <Button.Transparent
            onPress={async () => {
              await addCheckIn({
                date: this.state.date,
                result: 'BAD',
              });
              this.setState(() => ({ hasCheckInForToday: true }));
            }}
          >
            <ButtonText.Transparent>
              <Entypo size={98} name="emoji-sad" />
            </ButtonText.Transparent>
          </Button.Transparent>
        </ButtonsContainer>
      </Container>
    );
  }
}
