/* @flow */

import React, { Component } from 'react';
import { Animated, Text, View } from 'react-native';
import { LinearGradient } from 'expo';
import styled from 'styled-components';
import { Entypo } from '@expo/vector-icons';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

import { ROGUE_PINK, ROSY_HIGHLIGHT, OLD_GERANIUM } from '../utils/constants';

type Props = {
  itemIndex: number,
  animatedValue?: Animated.Value,
  date: string,
  note: string,
  result: string,
  noTitle?: boolean,
};

const Container = styled(Animated.View)`
  padding: 16px;
  width: 332px;
`;

const Card = styled(View)`
  background-color: ${props => props.theme.colors.white};
  border-radius: 3px;
  padding: 16px;
`;

const Date = styled(Text)`
  color: ${props => props.theme.colors.oldGeranium};
`;

const Rating = styled(Entypo)`
  position: absolute;
  top: 14;
  right: 16;
`;

const Note = styled(Animated.Text)`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.italic};
  font-size: 18;
`;

const Spacer = styled(View)`
  height: 1px;
  width: 100%;
  margin-vertical: 12px;
`;

export default class JournalEntry extends Component<Props, *> {
  static WIDTH: number = 332;

  render = () => {
    const {
      itemIndex,
      animatedValue,
      date,
      note,
      result,
      noTitle,
    } = this.props;
    const displayDate = format(parse(date), 'MMMM Do, YYYY');

    return (
      <Container
        style={
          !!animatedValue && {
            transform: [
              {
                scale: animatedValue.interpolate({
                  extrapolate: 'clamp',
                  inputRange: [itemIndex - 1, itemIndex, itemIndex + 1],
                  outputRange: [1, 1.1, 1],
                }),
              },
            ],
          }
        }
      >
        <Card>
          {!noTitle && <Date>{displayDate}</Date>}
          {!noTitle && (
            <Rating
              color={OLD_GERANIUM}
              name={result === 'GOOD' ? 'emoji-happy' : 'emoji-sad'}
              size={16}
            />
          )}
          {!noTitle && <Spacer />}
          <Note
            style={
              !!animatedValue && {
                opacity: animatedValue.interpolate({
                  extrapolate: 'clamp',
                  inputRange: [itemIndex - 1, itemIndex, itemIndex + 1],
                  outputRange: [0.3, 1, 0.3],
                }),
              }
            }
          >
            {note}
          </Note>
        </Card>
      </Container>
    );
  };
}
