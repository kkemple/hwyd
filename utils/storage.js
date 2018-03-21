/* @flow */

import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

import { STORE_DEFAULTS } from './constants';
import type { Store } from './types';

export const getUserData = async (): Promise<Store> => {
  const { uid } = firebase.auth().currentUser;

  try {
    const snapshot = await firebase.database().ref(`${uid}/`).once('value')
    const config = JSON.stringify(snapshot.val());
    return { ...STORE_DEFAULTS, ...(config ? JSON.parse(config) : {}) };
  } catch (error) {
    console.error(error);
    return { ...STORE_DEFAULTS };
  }
};

export const setUserData = async (
  operator: Store => Object,
): Promise < void> => {
  const config: Store = await getUserData();
  const newConfig = operator(config);
  const { uid } = firebase.auth().currentUser;

  return firebase.database().ref(`${uid}/`).set(newConfig);
};
