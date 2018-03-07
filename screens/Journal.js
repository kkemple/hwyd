/* @flow */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Journal extends Component<*, *> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 98 }}>🤯</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
