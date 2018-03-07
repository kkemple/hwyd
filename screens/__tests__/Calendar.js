import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { Calendar } from '../Calendar';
import theme from '../../utils/theme';

describe('<Calendar />', () => {
  it('renders', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Calendar />
      </ThemeProvider>,
    );

    const root = tree.find(Calendar).shallow();
    expect(root).toMatchSnapshot();
  });

  it('renders with markedDates', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Calendar />
      </ThemeProvider>,
    );

    const root = tree.find(Calendar).shallow();
    root.setState({
      markedDates: {
        '03-02-2018': { disabled: false, marked: true },
        '03-03-2018': { disabled: false, marked: true },
        '03-04-2018': { disabled: false, marked: true },
      },
    });
    expect(root).toMatchSnapshot();
  });
});
