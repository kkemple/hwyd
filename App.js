import React, { Component } from 'react';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import styled, { ThemeProvider } from 'styled-components';
import { Font } from 'expo';

import * as Screens from './screens';
import { Loader } from './components';
import theme from './utils/theme';
import { OLD_GERANIUM, ROGUE_PINK } from './utils/constants';

const LoaderContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabbedNavigation = TabNavigator(
  {
    CheckIN: {
      screen: Screens.CheckIn,
    },
    Calendar: {
      screen: Screens.Calendar,
    },
    Journal: {
      screen: Screens.Journal,
    },
    Reports: {
      screen: Screens.Reports,
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      style: {
        backgroundColor: OLD_GERANIUM,
      },
      indicatorStyle: {
        backgroundColor: ROGUE_PINK,
      },
    },
  },
);

export default class App extends Component {
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
        <Loader style={{ width: 200, height: 200 }} />
      </LoaderContainer>
    );
  }
}
