import React from 'react';
import { Text } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { Input } from '../';
import theme from '../../utils/theme';

describe('<Input />', () => {
  it('renders an email input', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Input
          label='Email Address'
          type="email"
          placeholder='you@domain.com'
        />
      </ThemeProvider>,
    );
    const root = tree.find(Input).shallow();
    expect(root).toMatchSnapshot();
  });

  it('renders a password input', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Input
          label='Password'
          type="password"
          autoCorrect={false}
          placeholder='*******'
          secureTextEntry
        />
      </ThemeProvider>,
    );
    const root = tree.find(Input).shallow();
    expect(root).toMatchSnapshot();
  });
});
