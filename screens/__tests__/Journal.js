import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Journal from '../Journal';
import theme from '../../utils/theme';

describe('<Journal />', () => {
  it('renders with no notes', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Journal />
      </ThemeProvider>,
    );

    const root = tree.find(Journal).shallow();
    expect(root).toMatchSnapshot();
  });

  it('renders a single note', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Journal />
      </ThemeProvider>,
    );

    const root = tree.find(Journal).shallow();
    root.setState({
      notes: [
        { date: '03-02-2018', note: 'Today was...', result: 'GOOD', id: 0 },
      ],
    });
    expect(root).toMatchSnapshot();
  });

  it('renders a carousel of notes', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Journal />
      </ThemeProvider>,
    );

    const root = tree.find(Journal).shallow();
    root.setState({
      notes: [
        { date: '03-02-2018', note: 'Today was...', result: 'GOOD', id: 0 },
        { date: '03-03-2018', note: 'Today was...', result: 'GOOD', id: 1 },
        { date: '03-04-2018', note: 'Today was...', result: 'BAD', id: 2 },
        { date: '03-05-2018', note: 'Today was...', result: 'BAD', id: 3 },
      ],
    });
    expect(root).toMatchSnapshot();
  });
});
