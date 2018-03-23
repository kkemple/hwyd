/* @flow */
import React, { Component } from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import styled from 'styled-components';
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';

import {
  googleLogin,
  loginCreditial,
  facebookLogin
} from '../utils/firebase';

import {
  OLD_GERANIUM,
  GOOGLE_COLOR,
  FACEBOOK_COLOR
} from '../utils/constants';

import {
  BackgroundGradient,
  ButtonText,
  Loader,
  Input
} from '../components';

type State = {
  loading: boolean,
  email: string,
  password: string,
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

const LoginWith = styled(ButtonText.Outline) `
    text-decoration: none;
    color: white;
    min-width: 200px;
    padding: 13px 0;
    text-align: center;
    margin: 12px auto;
    background: ${FACEBOOK_COLOR};
    display: flex;
    align-items: center;

    ${props => props.google && `
      background: ${GOOGLE_COLOR};
    `}
`;

const Title = styled(Text) `
  color: ${props => props.theme.colors.oldGeranium};
  font-family: ${props => props.theme.fonts.italic};
  font-size: 24px;
  margin: 20px auto;
`;

export default class Login extends Component<*, State> {

  state = { email: '', password: '', error: '', loading: false };

  register(email: string = '', password: string = '') {
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

  async onGoogleLogin() {
    this.setState({
      loading: true
    });

    const { type, idToken } = await googleLogin();
    if (type === 'success') {
      const credential = await firebase.auth.GoogleAuthProvider.credential(idToken);
      await loginCreditial(credential);

      return this.setState({
        loading: false
      })
    }

    this.setState({
      error: 'There was a problem with the login'
    })
  }

  async onFacebookLogin() {
    this.setState({
      loading: true
    });
    const { type, token } = await facebookLogin()

    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await loginCreditial(credential);

      return this.setState({
        loading: false
      })
    }

    this.setState({
      error: 'There was a problem with the login'
    })
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
        <Title>OR</Title>
        <LoginWith type="submit" onPress={this.onFacebookLogin.bind(this)}>
          <Text>Continue with {'  '}</Text>
          <Entypo name="facebook" size={12} color="#fff" />
        </LoginWith>
        <LoginWith google type="submit" onPress={this.onGoogleLogin.bind(this)}>
          <Text>Continue with {'  '}</Text>
          <Entypo name="google-" size={12} color="#fff" />
        </LoginWith>
      </Container>
    );
  }
}
