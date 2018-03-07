/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import styled, { ThemeProvider } from 'styled-components';
import { Font } from 'expo';
import { Entypo } from '@expo/vector-icons';

import * as Screens from './screens';
import { Loader } from './components';
import theme from './utils/theme';
import { OLD_GERANIUM, ROGUE_PINK, WHITE } from './utils/constants';

type State = {
  fontsLoaded: boolean,
};

const LoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabbedNavigation = TabNavigator(
  {
    Today: {
      screen: Screens.CheckIn,
    },
    Calendar: {
      screen: Screens.Calendar,
    },
    // Journal: {
    //   screen: Screens.Journal,
    // },
    Report: {
      screen: Screens.Reports,
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      inactiveTintColor: ROGUE_PINK,
      inactiveBackgroundColor: OLD_GERANIUM,
      activeTintColor: WHITE,
      activeBackgroundColor: OLD_GERANIUM,
      indicatorStyle: {
        backgroundColor: ROGUE_PINK,
      },
    },
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Today':
            iconName = 'emoji-neutral';
            break;
          case 'Calendar':
            iconName = 'calendar';
            break;
          case 'Report':
            iconName = 'bar-graph';
            break;
        }

        return <Entypo name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);

export default class App extends Component<*, State> {
  state = {
    fontsLoaded: false,
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      'lato-black': require('./assets/fonts/Lato-Black.ttf'),
      'lato-thin': require('./assets/fonts/Lato-Light.ttf'),
      'libre-bold': require('./assets/fonts/LibreBaskerville-Bold.ttf'),
      'libre-italic': require('./assets/fonts/LibreBaskerville-Italic.ttf'),
      'libre-regular': require('./assets/fonts/LibreBaskerville-Regular.ttf'),
    });

    this.setState({ fontsLoaded: true });
  };

  render() {
    return this.state.fontsLoaded ? (
      <ThemeProvider theme={theme}>
        <TabbedNavigation />
      </ThemeProvider>
    ) : (
      <LoaderContainer>
        <Loader style={{ width: 180, height: 180 }} />
      </LoaderContainer>
    );
  }
}
