import React from 'react';
import { ThemeProvider } from 'styled-components';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Button, ButtonText } from '../Button';
import theme from '../../utils/theme';

it('renders a transparent button (no background color)', () => {
  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <Button.Transparent />
      </ThemeProvider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
