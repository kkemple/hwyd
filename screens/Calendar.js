/* @flow */

import React, { Component } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import styled from 'styled-components';
import { CalendarList } from 'react-native-calendars';
import { LinearGradient } from 'expo';
import { Entypo } from '@expo/vector-icons';
import endOfYear from 'date-fns/end_of_year';
import format from 'date-fns/format';
import startOfToday from 'date-fns/start_of_today';
import startOfMonth from 'date-fns/start_of_month';
import endOfMonth from 'date-fns/end_of_month';
import addDays from 'date-fns/add_days';
import subMonths from 'date-fns/sub_months';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';

import CheckIn from './CheckIn';
import { Button, ButtonText, BackgroundGradient, Loader } from '../components';
import {
  BLACK,
  BOLD_FONT,
  OLD_GERANIUM,
  PENCIL_LEAD,
  REGULAR_FONT,
  TITLE_FONT,
  WHITE,
} from '../utils/constants';
import {
  addCheckInsListener,
  getCheckIns,
  removeCheckInsListener,
} from '../utils/actions';
import type { CheckIn as CheckInType } from '../utils/types';

type State = {
  loading: boolean,
  markedDates: {
    [key: string]: {
      marked: boolean,
      disabled: boolean,
    },
  },
};

const calendarTheme = {
  backgroundColor: 'transparent',
  calendarBackground: 'transparent',
  dayTextColor: BLACK,
  dotColor: OLD_GERANIUM,
  selectedDayBackgroundColor: OLD_GERANIUM,
  selectedDayTextColor: WHITE,
  textDayFontFamily: REGULAR_FONT,
  textDayHeaderFontFamily: TITLE_FONT,
  textDisabledColor: PENCIL_LEAD,
  textMonthFontFamily: BOLD_FONT,
  textMonthFontSize: 18,
  textSectionTitleColor: OLD_GERANIUM,
  todayTextColor: OLD_GERANIUM,
};

const Container = styled(View) `
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const ButtonsContainer = styled(View) `
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const Title = styled(Text) `
  font-family: ${props => props.theme.fonts.title};
  font-size: 36;
  margin-bottom: 24;
  text-align: center;
`;

const CheckInModal = styled(View) `
  background-color: ${props => props.theme.colors.white};
  border-radius: 3px;
  margin: auto;
  padding: 16px;
`;

export class Calendar extends Component<*, State> {
  checkInsListener: number;

  state = {
    markedDates: {},
    loading: true
  };
  componentWillMount = async () => {
    const checkIns = await getCheckIns();
    this.setState({
      loading: false
    });
    this.setMarkedDates(checkIns);

    this.checkInsListener = addCheckInsListener(checkIns => {
      this.setMarkedDates(checkIns);
    });
  };

  componentWillUnmount = () => {
    removeCheckInsListener(this.checkInsListener);
  };

  render() {
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor={OLD_GERANIUM} />
        <BackgroundGradient />
        {this.state.loading ?
          <Loader style={{ width: 100, height: 100 }} /> : (
            <CalendarList
              futureScrollRange={0}
              markedDates={this.state.markedDates}
              onDayPress={date => this.props.navigation.push('CheckIn', { date })}
              pastScrollRange={12}
              style={{ paddingTop: 24 }}
              theme={calendarTheme}
            />
          )}
      </Container>
    );
  }

  setMarkedDates = (checkIns: CheckInType[]) => {
    const calendarDates = this.buildCalendarDates();
    const markedDates = {};
    calendarDates.forEach(cd => {
      const checkInForDay = checkIns.find(c => c.date === cd.key);

      markedDates[cd.key] = {
        marked: !!checkInForDay,
        disabled: cd.isFuture,
      };
    });

    this.setState(() => ({ markedDates }));
  };

  buildCalendarDates = () => {
    const today = startOfToday();
    const startOfCurrentMonth = startOfMonth(today);
    const startOfNextMonth = addDays(endOfMonth(today), 1);
    let iteratee = subMonths(startOfCurrentMonth, 12);
    const dates = [];

    while (isBefore(iteratee, startOfNextMonth)) {
      const date = {
        displayDate: format(iteratee, 'MMMM Do, YYYYY'),
        isFuture: isAfter(iteratee, today),
        key: format(iteratee, 'YYYY-MM-DD'),
        raw: iteratee,
      };

      dates.push(date);
      iteratee = addDays(iteratee, 1);
    }

    return dates;
  };
}

export default StackNavigator(
  {
    Main: { screen: Calendar },
    CheckIn: { screen: CheckIn },
  },
  {
    headerMode: 'none',
  },
);
