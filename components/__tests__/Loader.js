import React from 'react';
import { Text } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Loader from '../Loader';
import theme from '../../utils/theme';

describe('<Loader />', () => {
  it('renders a loading animation', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Loader />
      </ThemeProvider>,
    );
    const root = tree.find(Loader).shallow();
    root.setState({ width: 100, height: 100 });
    expect(root).toMatchSnapshot();
  });
});
