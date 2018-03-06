import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { DangerZone } from 'expo';

import doneJSON from '../assets/animations/done.json';

let { Lottie } = DangerZone;

const Container = styled(View)`
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;

export default class Done extends Component {
  state = {
    width: 0,
    height: 0,
  };

  componentDidUpdate = () => {
    if (this.state.width > 0 && this.state.height > 0) {
      this.animation.reset();
      this.animation.play();
    }
  };

  onLayout = ({ nativeEvent: { layout: { width, height } } }) => {
    if (width === 0 || height === 0) return;
    this.setState(() => ({ width, height }));
  };

  render = () => {
    return (
      <Container onLayout={this.onLayout} style={this.props.style}>
        {this.state.width > 0 &&
          this.state.height > 0 && (
            <Lottie
              loop={false}
              style={{
                height: this.state.height,
                width: this.state.width,
              }}
              ref={ref => {
                this.animation = ref;
              }}
              source={doneJSON}
            />
          )}
      </Container>
    );
  };
}
