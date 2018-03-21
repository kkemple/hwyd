/* @flow */

import cuid from 'cuid';

import { setUserData, getUserData } from './storage';
import type { Store, CheckIn, CheckInData } from './types';

let listeners = [];

export const addCheckInsListener = (listener: (CheckIn[]) => void): number =>
listeners.push(listener);

export const removeCheckInsListener = (index: number) => {
  listeners = listeners.filter((_, i) => i !== index);
};

export const addCheckIn = async (
  checkInData: CheckInData,
): Promise<CheckIn> => {
  const checkIn = { ...checkInData, id: cuid() };

  await setUserData((store: Store) => ({
    check_ins: [...store.check_ins, checkIn],
  }));

  const checkIns = await getCheckIns();
  listeners.forEach(fn => fn(checkIns));

  return checkIn;
};

export const removeCheckIn = async (id: string): Promise<void> => {
  await setUserData((store: Store) => ({
    check_ins: store.check_ins.filter(c => c.id !== id),
  }));

  const checkIns = await getCheckIns();
  listeners.forEach(fn => fn(checkIns));
};

export const editCheckIn = async (
  id: string,
  checkIn: CheckIn,
): Promise<CheckIn | void> => {
  await setUserData((store: Store) => ({
    check_ins: store.check_ins.map(ci => {
      if (ci.id !== id) return ci;

      return { ...checkIn };
    }),
  }));

  const checkIns = await getCheckIns();
  listeners.forEach(fn => fn([...checkIns]));

  return { ...checkIn };
};

export const getCheckIns = async (): Promise<CheckIn[]> => {
  const store: Store = await getUserData();
  return store.check_ins;
};
