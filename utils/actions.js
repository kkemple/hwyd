/* @flow */

import cuid from 'cuid';

import { setLocalData, getLocalData } from './storage';
import type { Store, CheckIn, CheckInData } from './types';

let listeners = [];

export const addCheckInsListener = (listener: (CheckIn[]) => void): number =>
  listeners.push(listener);

export const removeCheckInsListener = (index: number) => {
  listeners = listeners.filter((_, i) => i !== index);
};

export const addCheckIn = async (checkIn: CheckInData): Promise<void> => {
  await setLocalData((store: Store) => ({
    check_ins: [...store.check_ins, { ...checkIn, id: cuid() }],
  }));

  const checkIns = await getCheckIns();
  listeners.forEach(fn => fn(checkIns));
};

export const removeCheckIn = async (id: string): Promise<void> => {
  await setLocalData((store: Store) => ({
    check_ins: store.check_ins.filter(c => c.id !== id),
  }));

  const checkIns = await getCheckIns();
  listeners.forEach(fn => fn(checkIns));
};

export const getCheckIns = async (): Promise<CheckIn[]> => {
  const store: Store = await getLocalData();
  return store.check_ins;
};
