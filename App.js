/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import styled, { ThemeProvider } from 'styled-components';
import { Font } from 'expo';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';

import * as Screens from './screens';
import { Loader } from './components';
import theme from './utils/theme';
import { OLD_GERANIUM, ROGUE_PINK, WHITE } from './utils/constants';

type State = {
  fontsLoaded: boolean,
  loading: boolean,
  loggedin: boolean,
};

const LoaderContainer = styled(View) `
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
    Journal: {
      screen: Screens.Journal,
    },
    Report: {
      screen: Screens.Reports,
    },
    Logout: {
      screen: Screens.Logout
    }
  },
  {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      inactiveTintColor: ROGUE_PINK,
      inactiveBackgroundColor: OLD_GERANIUM,
      activeTintColor: WHITE,
      activeBackgroundColor: OLD_GERANIUM,
      style: {
        backgroundColor: OLD_GERANIUM,
      },
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
          case 'Journal':
            iconName = 'book';
            break;
          case 'Logout':
            iconName = 'log-out';
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
    loggedin: false,
    loading: true
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      'lato-black': require('./assets/fonts/Lato-Black.ttf'),
      'lato-thin': require('./assets/fonts/Lato-Light.ttf'),
      'libre-bold': require('./assets/fonts/LibreBaskerville-Bold.ttf'),
      'libre-italic': require('./assets/fonts/LibreBaskerville-Italic.ttf'),
      'libre-regular': require('./assets/fonts/LibreBaskerville-Regular.ttf'),
    });

    var config = {
      apiKey: "AIzaSyCf_kqb15eEMeplDZ5UgFtlZ-IfKKe1Fr0",
      authDomain: "hwd-app-3b44a.firebaseapp.com",
      databaseURL: "https://hwd-app-3b44a.firebaseio.com",
      projectId: "hwd-app-3b44a",
      storageBucket: "hwd-app-3b44a.appspot.com",
      messagingSenderId: "758299686169"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        return this.setState({ loading: false, loggedin: true })
      }

      this.setState({ loading: false, loggedin: false })
    });

    this.setState({ fontsLoaded: true });
  };

  render() {
    return this.state.fontsLoaded && !this.state.loading ? (
      <ThemeProvider theme={theme}>
        {!this.state.loggedin ? <Screens.Login /> : <TabbedNavigation />}
      </ThemeProvider>
    ) : (
        <LoaderContainer>
          <Loader style={{ width: 180, height: 180 }} />
        </LoaderContainer>
      );
  }
}
