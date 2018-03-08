/* @flow */

import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import styled from 'styled-components';
import { LinearGradient, Constants } from 'expo';
import { Entypo } from '@expo/vector-icons';
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import type {
  NavigationScreenProp,
  NavigationStateRoute,
} from 'react-navigation';

import {
  BackgroundGradient,
  Button,
  ButtonText,
  checkIn,
  Done,
  JournalEntry,
  Loader,
} from '../components';
import { addCheckIn, editCheckIn, getCheckIns } from '../utils/actions';
import {
  DONE_ANIMATION_SPEED,
  OLD_GERANIUM,
  PENCIL_LEAD,
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
  note: ?string,
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

const CancelButton = styled(Button.Transparent)`
  position: absolute;
  right: 0;
  top: 32;
`;

const NoteForm = styled(TextInput)`
  align-self: stretch;
  color: ${props => props.theme.colors.oldGeranium};
  font-size: 18;
  padding: 8px;
  margin: 16px;
`;

const KeyboardView = styled(KeyboardAvoidingView)`
  align-items: stretch;
  flex: 1;
  justify-content: center;
`;

const Note = styled(Text)`
  color: ${props => props.theme.colors.oldGeranium};
  margin-top: 8px;
  max-width: 300px;
  text-align: center;
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
      note: !!todaysCheckIn ? todaysCheckIn.note : undefined,
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
        <BackgroundGradient />

        {!this.state.isToday && (
          <BackButton onPress={() => this.props.navigation.pop()}>
            <Entypo size={24} name="chevron-thin-left" color={OLD_GERANIUM} />
          </BackButton>
        )}

        {this.state.checkIn &&
          !this.state.showDoneAnimation && (
            <EditButton
              onPress={() => this.setState(() => ({ editing: true }))}
            >
              <Entypo size={26} name="pencil" color={OLD_GERANIUM} />
            </EditButton>
          )}

        {!this.state.isToday && (
          <DisplayDate>{this.state.displayDate}</DisplayDate>
        )}

        {this.state.showDoneAnimation ? (
          <Done style={{ width: 200, height: 200 }} />
        ) : (
          [
            <Entypo
              key="result"
              color={OLD_GERANIUM}
              size={98}
              name={
                this.state.checkIn.result === 'GOOD'
                  ? 'emoji-happy'
                  : 'emoji-sad'
              }
            />,
            !!this.state.checkIn.note && (
              <JournalEntry noTitle key="note" {...this.state.checkIn} />
            ),
          ]
        )}
      </Container>
    ) : (
      <Container>
        <BackgroundGradient />
        {!this.state.isToday && (
          <BackButton onPress={() => this.props.navigation.pop()}>
            <Entypo size={24} name="chevron-thin-left" color={OLD_GERANIUM} />
          </BackButton>
        )}

        {this.state.editing && (
          <CancelButton
            onPress={() => this.setState(() => ({ editing: false }))}
          >
            <Entypo size={26} name="cross" color={OLD_GERANIUM} />
          </CancelButton>
        )}

        <KeyboardView behavior="padding">
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
                  const data = {
                    ...this.state.checkIn,
                    date: this.state.checkIn.date,
                    note: this.state.note,
                    result: 'GOOD',
                  };

                  checkIn = await editCheckIn(this.state.checkIn.id, data);
                } else {
                  checkIn = await addCheckIn({
                    date: this.state.date,
                    note: this.state.note,
                    result: 'GOOD',
                  });
                }

                this.setState(
                  () => ({
                    checkIn,
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
                  const data = {
                    ...this.state.checkIn,
                    note: this.state.note,
                    result: 'BAD',
                  };

                  checkIn = await editCheckIn(this.state.checkIn.id, data);
                } else {
                  checkIn = await addCheckIn({
                    date: this.state.date,
                    note: this.state.note,
                    result: 'BAD',
                  });
                }

                this.setState(
                  () => ({
                    checkIn,
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

          <NoteForm
            autoCorrect
            multiline
            placeholder="Today was..."
            placeholderTextColor={PENCIL_LEAD}
            underlineColorAndroid="transparent"
            selectionColor={OLD_GERANIUM}
            value={this.state.note}
            onChangeText={text => this.setState(() => ({ note: text }))}
          />
        </KeyboardView>
      </Container>
    );
  }
}
