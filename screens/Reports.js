/* @flow */

import React, { Component } from 'react';
import { Dimensions, StatusBar, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import styled from 'styled-components';
import { VictoryChart, VictoryLine } from 'victory-native';
import { sortBy } from 'lodash';
import { Entypo } from '@expo/vector-icons';

import { BackgroundGradient, Loader } from '../components';
import { ROGUE_PINK, ROSY_HIGHLIGHT, OLD_GERANIUM } from '../utils/constants';
import {
  getCheckIns,
  addCheckInsListener,
  removeCheckInsListener,
} from '../utils/actions';
import type { CheckIn } from '../utils/types';

const buildData = (dataSet, ratingResult) => ({
  totalGood: dataSet.filter(d => d.result === 'GOOD').length,
  totalBad: dataSet.filter(d => d.result === 'BAD').length,
  totalAverage: dataSet.filter(d => d.result === 'AVERAGE').length,
  chartData: dataSet.map((ci, i) => {
    ratingResult = deriveCountFromResult(ci.result, ratingResult);

    return {
      x: i,
      y: ratingResult,
    };
  }),
})

type State = {
  checkIns: CheckIn[],
  loading: boolean
};

const Container = styled(View) `
  flex: 1;
  padding: 48px 24px;
  align-items: center;
  justify-content: center;
`;

const ChartTitle = styled(Text) `
  color: ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fonts.subtitle};
  font-size: 14;
`;

const ChartContainer = styled(View) `
  background-color: ${props => props.theme.colors.white};
  border-radius: 3px;
  margin-bottom: 16;
  padding: 8px;
  width: 316px;
`;

const ChartsContainer = styled(ScrollView) `
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const ChartLegend = styled(View) `
  align-items: center;
  bottom: 8;
  flex-direction: row;
  left: 8;
  position: absolute;
`;

const ChartLabel = styled(Text) `
  color: ${props => props.theme.colors.oldGeranium};
  font-family: ${props => props.theme.fonts.title};
  font-size: 14;
`;

const Title = styled(Text)`
  color: ${props => props.theme.colors.oldGeranium};
  font-family: ${props => props.theme.fonts.italic};
  font-size: 24px;
  margin: 48px 24px;
  margin-bottom: 0;
  text-align: center;
`;

const deriveCountFromResult = (
  result: string,
  currentCount: number,
): number => {
  switch (result) {
    case 'GOOD':
      return currentCount + 1;
    case 'BAD':
      return currentCount - 1;
    case 'AVERAGE':
    default:
      return currentCount;
  }
};

export default class Reports extends Component<*, State> {
  checkInsListener: number;

  state = {
    checkIns: [],
    loading: true
  };

  build7DayData = () => {
    const { checkIns } = this.state;
    let ratingResult = 0;
    const dataSet = checkIns.slice(0, 7);

    return buildData(dataSet, ratingResult);
  };

  build30DayData = () => {
    const { checkIns } = this.state;
    let ratingResult = 0;

    const dataSet = checkIns.slice(0, 30);

    return buildData(dataSet, ratingResult);
  };

  build180DayData = () => {
    const { checkIns } = this.state;
    let ratingResult = 0;

    const dataSet = checkIns.slice(0, 180);

    return buildData(dataSet, ratingResult);;
  };

  build365DayData = () => {
    const { checkIns } = this.state;
    let ratingResult = 0;

    const dataSet = checkIns.slice(0, 365);

    return buildData(dataSet, ratingResult);;
  };

  setCheckIns = (checkIns: CheckIn[]) => {
    this.setState(() => ({ checkIns: sortBy(checkIns, 'date').reverse() }));
  };

  componentWillMount = async () => {
    const checkIns = await getCheckIns();
    this.setState({ loading: false })
    this.setCheckIns(checkIns);

    this.checkInsListener = addCheckInsListener(checkIns => {
      this.setCheckIns(checkIns);
    });
  };

  componentWillUnmount = () => {
    removeCheckInsListener(this.checkInsListener);
  };

  render() {
    const { checkIns, loading } = this.state;

    if (loading) {
      return (
        <Container>
          <BackgroundGradient />
          <Loader style={{ width: 100, height: 100 }} />
        </Container>
      )
    }

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
        <StatusBar barStyle="light-content" backgroundColor={OLD_GERANIUM} />
        <BackgroundGradient />
        <ChartsContainer
          contentContainerStyle={{ alignItems: 'center', paddingVertical: 48 }}
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
              <ChartLabel style={{ marginRight: 16 }}>
                <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                {` ${lastWeekData.totalBad}`}
              </ChartLabel>
              <ChartLabel>
                <Entypo name="emoji-neutral" color={OLD_GERANIUM} size={16} />
                {` ${lastWeekData.totalAverage}`}
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
                <ChartLabel style={{ marginRight: 16 }}>
                  <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                  {` ${lastMonthData.totalBad}`}
                </ChartLabel>
                <ChartLabel>
                  <Entypo name="emoji-neutral" color={OLD_GERANIUM} size={16} />
                  {` ${lastMonthData.totalAverage}`}
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
                <ChartLabel style={{ marginRight: 16 }}>
                  <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                  {` ${lastSixMonthsData.totalBad}`}
                </ChartLabel>
                <ChartLabel>
                  <Entypo name="emoji-neutral" color={OLD_GERANIUM} size={16} />
                  {` ${lastSixMonthsData.totalAverage}`}
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
                data={lastWeekData.chartData}
              />
              <ChartLegend>
                <ChartLabel style={{ marginRight: 16 }}>
                  <Entypo name="emoji-happy" color={OLD_GERANIUM} size={16} />
                  {` ${lastWeekData.totalGood}`}
                </ChartLabel>
                <ChartLabel style={{ marginRight: 16 }}>
                  <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                  {` ${lastWeekData.totalBad}`}
                </ChartLabel>
                <ChartLabel>
                  <Entypo name="emoji-neutral" color={OLD_GERANIUM} size={16} />
                  {` ${lastWeekData.totalAverage}`}
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
                  <ChartLabel style={{ marginRight: 16 }}>
                    <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                    {` ${lastMonthData.totalBad}`}
                  </ChartLabel>
                  <ChartLabel>
                    <Entypo name="emoji-neutral" color={OLD_GERANIUM} size={16} />
                    {` ${lastMonthData.totalAverage}`}
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
                  <ChartLabel style={{ marginRight: 16 }}>
                    <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                    {` ${lastSixMonthsData.totalBad}`}
                  </ChartLabel>
                  <ChartLabel>
                    <Entypo name="emoji-neutral" color={OLD_GERANIUM} size={16} />
                    {` ${lastSixMonthsData.totalAverage}`}
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
                  <ChartLabel style={{ marginRight: 16 }}>
                    <Entypo name="emoji-sad" color={OLD_GERANIUM} size={16} />
                    {` ${lastYearData.totalBad}`}
                  </ChartLabel>
                  <ChartLabel>
                    <Entypo name="emoji-neutral" color={OLD_GERANIUM} size={16} />
                    {` ${lastYearData.totalAverage}`}
                  </ChartLabel>
                </ChartLegend>
              </ChartContainer>
            )}
          </ChartsContainer>
        </Container>
      );
    }
  }
}
