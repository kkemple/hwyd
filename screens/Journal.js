/* @flow */

import React, { Component, Fragment } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components';
import SideSwipe from 'react-native-sideswipe';
import { sortBy } from 'lodash';

import { BackgroundGradient, JournalEntry, Loader } from '../components';
import {
  addCheckInsListener,
  getCheckIns,
  removeCheckInsListener,
} from '../utils/actions';
import { OLD_GERANIUM } from '../utils/constants';
import type { CheckIn } from '../utils/types';

type State = {
  notes: CheckIn[],
  loading: boolean
};

const Container = styled(View) `
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Carousel = styled(SideSwipe) `
  margin: auto;
`;

const SingleEntry = styled(View) `
  align-items: center;
  flex: 1;
  justify-content: center;
`;

const Title = styled(Text) `
  color: ${props => props.theme.colors.oldGeranium};
  font-family: ${props => props.theme.fonts.italic};
  font-size: 24px;
  margin: 48px 24px;
  margin-bottom: 0;
`;

const NoEntries = styled(Text) `
  color: ${props => props.theme.colors.oldGeranium};
  font-family: ${props => props.theme.fonts.italic};
  font-size: 18px;
  margin: auto;
`;

const { width: screenWidth } = Dimensions.get('window');

export default class Journal extends Component<*, State> {
  checkInsListener: number;

  state = {
    notes: [],
    loading: true
  };

  componentWillMount = async () => {
    const checkIns = await getCheckIns();

    this.checkInsListener = addCheckInsListener(checkIns => {
      this.setState(() => ({
        notes: sortBy(checkIns.filter(c => !!c.note), 'date').reverse(),
        loading: false
      }));
    });

    this.setState(() => ({
      notes: sortBy(checkIns.filter(c => !!c.note), 'date').reverse(),
      loading: false
    }));
  };

  componentWillUnmount = () => {
    removeCheckInsListener(this.checkInsListener);
  };

  render() {
    const offset = (screenWidth - JournalEntry.WIDTH) / 2;
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor={OLD_GERANIUM} />
        <BackgroundGradient />
        {this.state.loading ?
          <Loader style={{ width: 100, height: 100 }} /> : (
            <Fragment>
              <Title>Journal</Title>
              {
                this.state.notes.length === 1 && (
                  <SingleEntry>
                    <JournalEntry {...this.state.notes[0]} />
                  </SingleEntry>
                )
              }

              {this.state.notes.length > 1 && (
                <Carousel
                  data={this.state.notes}
                  itemWidth={JournalEntry.WIDTH}
                  threshold={100}
                  contentOffset={offset}
                  contentContainerStyle={{ alignItems: 'center' }}
                  renderItem={({ item, ...rest }) => (
                    <JournalEntry {...rest} {...item} />
                  )}
                />
              )}

              {this.state.notes.length === 0 && (
                <NoEntries>No entries yet.</NoEntries>
              )}
            </Fragment>
          )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
