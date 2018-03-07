import React from 'react';
import { ThemeProvider } from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import CheckIn from '../CheckIn';
import theme from '../../utils/theme';

it('renders check in screen', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <CheckIn navigation={{ state: {} }} />
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
