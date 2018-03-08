import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import BackgroundGradient from '../BackgroundGradient';
import theme from '../../utils/theme';

describe('<BackgroundGradient />', () => {
  it('renders a linear gradient background', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <BackgroundGradient />
      </ThemeProvider>,
    );
    const root = tree.find(BackgroundGradient).shallow();
    expect(root).toMatchSnapshot();
  });
});
