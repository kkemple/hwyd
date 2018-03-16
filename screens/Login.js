/* @flow */
import React, { Component } from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components';
import firebase from 'firebase';

import {
  OLD_GERANIUM
} from '../utils/constants';

import {
  BackgroundGradient,
  ButtonText,
  Loader,
  Input
} from '../components';

type State = {
  loading: boolean,
  email: ?string,
  password: ?string,
  error: ?string,
};


const Container = styled(View) `
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 0 10%;
`;

const Error = styled(Text) `
  color: ${OLD_GERANIUM}
  margin: 20px;
`

export default class Login extends Component<State> {

  state = { email: '', password: '', error: '', loading: false };

  register(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { this.setState({ error: '', loading: false }); })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  }

  onLoginPress() {
    this.setState({ error: '', loading: true });

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => this.setState({ loading: false }))
      .catch(() => this.register(email, password));
  }


  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <Loader style={{ width: 50, height: 50 }} />
    }
    return (
      <ButtonText.Default onPress={this.onLoginPress.bind(this)}>
        <Text>Log in/Register</Text>
      </ButtonText.Default>
    )
  }

  render() {
    const { loading } = this.state
    return (
      <Container>
        <StatusBar barStyle="light-content" backgroundColor={OLD_GERANIUM} />
        <BackgroundGradient />
        <Input
          label='Email Address'
          type="email"
          placeholder='you@domain.com'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <Input
          label='Password'
          type="password"
          autoCorrect={false}
          placeholder='*******'
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Error>{this.state.error}</Error>
        <ButtonText.Default type="submit" onPress={this.onLoginPress.bind(this)}>
          {loading ? (
            <Loader style={{ width: 50, height: 50 }} />
          ) : <Text>Log in/Register</Text>
          }
        </ButtonText.Default>
      </Container >
    );
  }
}
