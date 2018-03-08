/* @flow */

import React, { Component } from 'react';
import { Dimensions, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import styled from 'styled-components';
import { VictoryChart, VictoryLine } from 'victory-native';
import { sortBy } from 'lodash';
import { Entypo } from '@expo/vector-icons';

import { BackgroundGradient } from '../components';
import { ROGUE_PINK, ROSY_HIGHLIGHT, OLD_GERANIUM } from '../utils/constants';
import {
  getCheckIns,
  addCheckInsListener,
  removeCheckInsListener,
} from '../utils/actions';
import type { CheckIn } from '../utils/types';

type State = {
  checkIns: CheckIn[],
};

const Container = styled(View)`
  flex: 1;
  padding: 48px 24px;
`;

const ChartTitle = styled(Text)`
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.subtitle};
  font-size: 14;
`;

const ChartContainer = styled(View)`
  background-color: ${props => props.theme.colors.white};
  border-radius: 3px;
  margin-bottom: 16;
  padding: 8px;
  width: 316px;
`;

const ChartsContainer = styled(ScrollView)`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const ChartLegend = styled(View)`
  align-items: center;
  bottom: 8;
  flex-direction: row;
  left: 8;
  position: absolute;
`;

const ChartLabel = styled(Text)`
  color: ${props => props.theme.colors.oldGeranium};
  font-family: ${props => props.theme.fonts.title};
  font-size: 14;
`;

const Title = styled(Text)`
  font-family: ${props => props.theme.fonts.title};
  font-size: 40;
  margin-bottom: 36;
  text-align: center;
`;

export default class Reports extends Component<*, State> {
  checkInsListener: number;

  state = {
    checkIns: [],
  };

  componentWillMount = async () => {
    const checkIns = await getCheckIns();
  };

  componentWillMount = async () => {
    const checkIns = await getCheckIns();
    this.setCheckIns(checkIns);

    this.checkInsListener = addCheckInsListener(checkIns => {
      this.setCheckIns(checkIns);
    });
  };

  componentWillUnmount = () => {
    removeCheckInsListener(this.checkInsListener);
  };

  render() {
    const { checkIns } = this.state;

    if (checkIns.length < 7) {
      return (
        <Container>
          <BackgroundGradient />
          <Title>Nothing to Report Yet!</Title>
        </Container>
      );
    }

    const lastWeekData = this.build7DayData();
    const lastMonthData = this.build30DayData();
    const lastSixMonthsData = this.build180DayData();
    const lastYearData = this.build365DayData();

    return (
      <Container>
        <BackgroundGradient />
        <ChartsContainer
          contentContainerStyle={{ alignItems: 'center', paddingVertical: 36 }}
        >
          <ChartContainer key={'seven-day-overview'}>
            <ChartTitle>LAST WEEK</ChartTitle>
            <VictoryLine
              width={300}
              height={150}
              style={{
                data: {
                  stroke: OLD_GERANIUM,
                  strokeWidth: 2,
                },
              }}
              data={lastWeekData.chartData}
            />
            <ChartLegend>
              <ChartLabel style={{ marginRight: 16 }}>
                <Entypo name="emoji-happy" color={OLD_GERANIUM} size={16} />
                {` ${lastWeekData.totalGood}`}
              </ChartLabel>
              <ChartLabel>
                <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                {` ${lastWeekData.totalBad}`}
              </ChartLabel>
            </ChartLegend>
          </ChartContainer>
          {checkIns.length > 30 && (
            <ChartContainer key={'thirty-day-overview'}>
              <ChartTitle>LAST MONTH</ChartTitle>
              <VictoryLine
                width={300}
                height={150}
                style={{
                  data: {
                    stroke: OLD_GERANIUM,
                    strokeWidth: 2,
                  },
                }}
                data={lastMonthData.chartData}
              />
              <ChartLegend>
                <ChartLabel style={{ marginRight: 16 }}>
                  <Entypo name="emoji-happy" color={OLD_GERANIUM} size={16} />
                  {` ${lastMonthData.totalGood}`}
                </ChartLabel>
                <ChartLabel>
                  <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                  {` ${lastMonthData.totalBad}`}
                </ChartLabel>
              </ChartLegend>
            </ChartContainer>
          )}

          {checkIns.length > 180 && (
            <ChartContainer key={'one-hundred-eighty-day-overview'}>
              <ChartTitle>LAST SIX MONTHS</ChartTitle>
              <VictoryLine
                width={300}
                height={150}
                style={{
                  data: {
                    stroke: OLD_GERANIUM,
                    strokeWidth: 2,
                  },
                }}
                data={lastSixMonthsData.chartData}
              />
              <ChartLegend>
                <ChartLabel style={{ marginRight: 16 }}>
                  <Entypo name="emoji-happy" color={OLD_GERANIUM} size={16} />
                  {` ${lastSixMonthsData.totalGood}`}
                </ChartLabel>
                <ChartLabel>
                  <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                  {` ${lastSixMonthsData.totalBad}`}
                </ChartLabel>
              </ChartLegend>
            </ChartContainer>
          )}

          {checkIns.length > 220 && (
            <ChartContainer key={'one-year-overview'}>
              <ChartTitle>LAST YEAR</ChartTitle>
              <VictoryLine
                width={300}
                height={150}
                style={{
                  data: {
                    stroke: OLD_GERANIUM,
                    strokeWidth: 2,
                  },
                }}
                data={lastYearData.chartData}
              />
              <ChartLegend>
                <ChartLabel style={{ marginRight: 16 }}>
                  <Entypo name="emoji-happy" color={OLD_GERANIUM} size={16} />
                  {` ${lastYearData.totalGood}`}
                </ChartLabel>
                <ChartLabel>
                  <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                  {` ${lastYearData.totalBad}`}
                </ChartLabel>
              </ChartLegend>
            </ChartContainer>
          )}
        </ChartsContainer>
      </Container>
    );
  }

  setCheckIns = (checkIns: CheckIn[]) => {
    this.setState(() => ({ checkIns: sortBy(checkIns, 'date').reverse() }));
  };

  build7DayData = () => {
    const { checkIns } = this.state;
    let ratingResult = 0;

    const dataSet = checkIns.slice(0, 7);

    return {
      totalGood: dataSet.filter(d => d.result === 'GOOD').length,
      totalBad: dataSet.filter(d => d.result === 'BAD').length,
      chartData: dataSet.map((ci, i) => ({
        x: i,
        y: ci.result === 'GOOD' ? ++ratingResult : --ratingResult,
      })),
    };
  };

  build30DayData = () => {
    const { checkIns } = this.state;
    let ratingResult = 0;

    const dataSet = checkIns.slice(0, 30);

    return {
      totalGood: dataSet.filter(d => d.result === 'GOOD').length,
      totalBad: dataSet.filter(d => d.result === 'BAD').length,
      chartData: dataSet.map((ci, i) => ({
        x: i,
        y: ci.result === 'GOOD' ? ++ratingResult : --ratingResult,
      })),
    };
  };

  build180DayData = () => {
    const { checkIns } = this.state;
    let ratingResult = 0;

    const dataSet = checkIns.slice(0, 180);

    return {
      totalGood: dataSet.filter(d => d.result === 'GOOD').length,
      totalBad: dataSet.filter(d => d.result === 'BAD').length,
      chartData: dataSet.map((ci, i) => ({
        x: i,
        y: ci.result === 'GOOD' ? ++ratingResult : --ratingResult,
      })),
    };
  };

  build365DayData = () => {
    const { checkIns } = this.state;
    let ratingResult = 0;

    const dataSet = checkIns.slice(0, 365);

    return {
      totalGood: dataSet.filter(d => d.result === 'GOOD').length,
      totalBad: dataSet.filter(d => d.result === 'BAD').length,
      chartData: dataSet.map((ci, i) => ({
        x: i,
        y: ci.result === 'GOOD' ? ++ratingResult : --ratingResult,
      })),
    };
  };
}
