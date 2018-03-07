import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import CheckIn from '../CheckIn';
import theme from '../../utils/theme';

describe('<CheckIn />', () => {
  it('renders loading state', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <CheckIn navigation={{ state: {} }} />
      </ThemeProvider>,
    );

    const root = tree.find(CheckIn).shallow();
    expect(root).toMatchSnapshot();
  });

  it('renders check in state', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <CheckIn navigation={{ state: {} }} />
      </ThemeProvider>,
    );

    const root = tree.find(CheckIn).shallow();
    root.setState({ loading: false, hasCheckInForToday: false });
    expect(root).toMatchSnapshot();
  });

  it('renders done state', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <CheckIn navigation={{ state: {} }} />
      </ThemeProvider>,
    );

    const root = tree.find(CheckIn).shallow();
    root.setState({ loading: false, hasCheckInForToday: true });
    expect(root).toMatchSnapshot();
  });
});
