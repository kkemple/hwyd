import React from 'react';
import { ThemeProvider } from 'styled-components';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import Done from '../Done';
import theme from '../../utils/theme';

describe('<Done />', () => {
  it('renders a done with check in animation', () => {
    const tree = shallow(
      <ThemeProvider theme={theme}>
        <Done />
      </ThemeProvider>,
    );
    const root = tree.find(Done).shallow();
    expect(root).toMatchSnapshot();
  });
});
