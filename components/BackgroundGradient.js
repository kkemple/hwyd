/* @flow */

import React, { Component } from 'react';
import { LinearGradient } from 'expo';
import styled from 'styled-components';

import { ROGUE_PINK, ROSY_HIGHLIGHT } from '../utils/constants';

const Background = styled(LinearGradient)`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export default class BackgroundGradient extends Component<*, *> {
  render = () => (
    <Background colors={[ROGUE_PINK, ROSY_HIGHLIGHT]} {...this.props} />
  );
}
