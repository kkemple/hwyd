import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Login from '../Login';
import theme from '../../utils/theme';

describe('<Login />', () => {
  it('renders', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>,
    );

    const root = tree.find(Login).shallow();
    expect(root).toMatchSnapshot();
  });
});
