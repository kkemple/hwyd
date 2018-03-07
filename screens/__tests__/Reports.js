import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Reports from '../Reports';
import theme from '../../utils/theme';

describe('<Reports />', () => {
  it('renders a no check ins state', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Reports />
      </ThemeProvider>,
    );

    const root = tree.find(Reports).shallow();
    expect(root).toMatchSnapshot();
  });

  it('renders reports for check ins', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Reports />
      </ThemeProvider>,
    );

    const root = tree.find(Reports).shallow();
    root.setState({
      checkIns: [
        { date: '03-02-2018', result: 'GOOD', id: 0 },
        { date: '03-03-2018', result: 'GOOD', id: 1 },
        { date: '03-04-2018', result: 'GOOD', id: 2 },
        { date: '03-05-2018', result: 'BAD', id: 3 },
        { date: '03-06-2018', result: 'BAD', id: 4 },
        { date: '03-07-2018', result: 'BAD', id: 5 },
        { date: '03-08-2018', result: 'GOOD', id: 6 },
        { date: '03-09-2018', result: 'GOOD', id: 7 },
        { date: '03-10-2018', result: 'BAD', id: 8 },
        { date: '03-11-2018', result: 'GOOD', id: 9 },
      ],
    });
    expect(root).toMatchSnapshot();
  });
});
