import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { DangerZone } from 'expo';

import loaderJSON from '../assets/animations/loading.json';

let { Lottie } = DangerZone;

const Container = styled(View)`
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;

export default class Loader extends Component {
  state = {
    width: 0,
    height: 0,
  };

  componentDidUpdate = () => {
    if (this.state.width > 0 && this.state.height > 0 && this.animation) {
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
      <Container
        onLayout={this.onLayout}
        style={[
          {
            borderRadius: this.state.width / 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
          this.props.style,
        ]}
      >
        {this.state.width > 0 &&
          this.state.height > 0 && (
            <Lottie
              loop
              style={{
                height: this.state.height,
                width: this.state.width,
              }}
              ref={ref => {
                this.animation = ref;
              }}
              source={loaderJSON}
            />
          )}
      </Container>
    );
  };
}
