/* @flow */
import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import styled from 'styled-components';
import firebase from 'firebase';
import {
  Loader,
} from '../components';


const Container = styled(View) `
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export default class Logout extends Component<*, *> {

  async componentDidMount() {
    const { navigate } = this.props.navigation;

    try {
      await firebase.auth().signOut()
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <Container>
        <Loader style={{ width: 100, height: 100 }} />
      </Container>
    );
  }
}
