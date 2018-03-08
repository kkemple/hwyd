import React from 'react';
import { Animated } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import JournalEntry from '../JournalEntry';
import theme from '../../utils/theme';

const note = {
  note: 'Today was...',
  result: 'GOOD',
  id: 0,
  date: '03-02-2018',
};

describe('<JournalEntry />', () => {
  it('renders a journal entry', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <JournalEntry {...note} />
      </ThemeProvider>,
    );
    const root = tree.find(JournalEntry).shallow();
    expect(root).toMatchSnapshot();
  });

  it('renders a journal entry with no title', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <JournalEntry noTitle {...note} />
      </ThemeProvider>,
    );
    const root = tree.find(JournalEntry).shallow();
    expect(root).toMatchSnapshot();
  });

  it('renders an animated journal entry', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <JournalEntry
          animatedValue={new Animated.Value(0)}
          itemIndex={0}
          {...note}
        />
      </ThemeProvider>,
    );
    const root = tree.find(JournalEntry).shallow();
    expect(root).toMatchSnapshot();
  });
});
