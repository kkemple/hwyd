/* @flow */

import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';
import styled from 'styled-components';
import { LinearGradient, Constants } from 'expo';
import { Entypo } from '@expo/vector-icons';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import type {
  NavigationScreenProp,
  NavigationStateRoute,
} from 'react-navigation';

import { Button, ButtonText, checkIn, Loader, Done } from '../components';
import { getCheckIns, addCheckIn, editCheckIn } from '../utils/actions';
import {
  DONE_ANIMATION_SPEED,
  OLD_GERANIUM,
  ROGUE_PINK,
  ROSY_HIGHLIGHT,
} from '../utils/constants';
import type { CheckInData, CheckIn as CheckInType } from '../utils/types';

type Props = {
  navigation: NavigationScreenProp<NavigationStateRoute>,
};

type State = {
  checkIn: CheckInType | null,
  date: string,
  displayDate: ?string,
  editing: boolean,
  isToday: boolean,
  loading: boolean,
  showDoneAnimation: boolean,
};

const ButtonsContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const Container = styled(View)`
  align-items: center;
  flex: 1;
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
  color: ${props => props.theme.colors.oldGeranium};
  font-family: ${props => `${props.theme.fonts.subtitle}`};
  font-size: 24;
  margin-bottom: 24;
  text-align: center;
`;

const Background = styled(LinearGradient)`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const BackButton = styled(Button.Transparent)`
  left: 0;
  position: absolute;
  top: 32;
`;

const EditButton = styled(Button.Transparent)`
  position: absolute;
  right: 0;
  top: 32;
`;

const NoteForm = styled(TextInput)`
  color: ${props => props.theme.colors.pencilLead};
  padding: 4;
`;

export default class CheckIn extends Component<Props, State> {
  state = {
    checkIn: null,
    date: this.props.navigation.state.params
      ? this.props.navigation.state.params.date.dateString
      : format(new Date(), 'YYYY-MM-DD'),
    displayDate: this.props.navigation.state.params
      ? format(
          parse(this.props.navigation.state.params.date.dateString),
          'MMMM Do, YYYY',
        )
      : undefined,
    editing: false,
    isToday: !this.props.navigation.state.params,
    loading: true,
    note: undefined,
    showDoneAnimation: false,
  };

  componentWillMount = async () => {
    const checkIns = await getCheckIns();
    const todaysCheckIn = checkIns.find(c => c.date === this.state.date);

    this.setState(() => ({
      checkIn: todaysCheckIn,
      loading: false,
    }));
  };

  render() {
    return this.state.loading ? (
      <Container>
        <Loader style={{ width: 100, height: 100 }} />
      </Container>
    ) : this.state.checkIn && !this.state.editing ? (
      <Container>
        <Background colors={[ROGUE_PINK, ROSY_HIGHLIGHT]} />

        {!this.state.isToday && (
          <BackButton onPress={() => this.props.navigation.pop()}>
            <Entypo size={24} name="chevron-thin-left" color={OLD_GERANIUM} />
          </BackButton>
        )}

        {this.state.checkIn && (
          <EditButton onPress={() => this.setState(() => ({ editing: true }))}>
            <Entypo size={26} name="pencil" color={OLD_GERANIUM} />
          </EditButton>
        )}

        {!this.state.isToday && (
          <DisplayDate>{this.state.displayDate}</DisplayDate>
        )}

        {this.state.showDoneAnimation ? (
          <Done style={{ width: 200, height: 200 }} />
        ) : (
          <Entypo
            color={OLD_GERANIUM}
            size={98}
            name={
              this.state.checkIn.result === 'GOOD' ? 'emoji-happy' : 'emoji-sad'
            }
          />
        )}
      </Container>
    ) : (
      <Container>
        <Background colors={[ROGUE_PINK, ROSY_HIGHLIGHT]} />

        {!this.state.isToday && (
          <BackButton onPress={() => this.props.navigation.pop()}>
            <Entypo size={24} name="chevron-thin-left" color={OLD_GERANIUM} />
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
              let checkIn;

              if (this.state.checkIn) {
                checkIn = await editCheckIn(this.state.checkIn.id, 'GOOD');
              } else {
                checkIn = await addCheckIn({
                  date: this.state.date,
                  result: 'GOOD',
                });
              }

              this.setState(
                () => ({
                  checkIn: checkIn,
                  editing: false,
                  showDoneAnimation: true,
                }),
                () =>
                  setTimeout(
                    () => this.setState(() => ({ showDoneAnimation: false })),
                    DONE_ANIMATION_SPEED,
                  ),
              );
            }}
          >
            <ButtonText.Transparent>
              <Entypo size={98} name="emoji-happy" />
            </ButtonText.Transparent>
          </Button.Transparent>

          <Button.Transparent
            onPress={async () => {
              let checkIn;

              if (this.state.checkIn) {
                checkIn = await editCheckIn(this.state.checkIn.id, 'BAD');
              } else {
                checkIn = await addCheckIn({
                  date: this.state.date,
                  result: 'BAD',
                });
              }

              this.setState(
                () => ({
                  checkIn: checkIn,
                  editing: false,
                  showDoneAnimation: true,
                }),
                () =>
                  setTimeout(
                    () => this.setState(() => ({ showDoneAnimation: false })),
                    DONE_ANIMATION_SPEED,
                  ),
              );
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
