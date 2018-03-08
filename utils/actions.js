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

export const addCheckIn = async (
  checkInData: CheckInData,
): Promise<CheckIn> => {
  const checkIn = { ...checkInData, id: cuid() };

  await setLocalData((store: Store) => ({
    check_ins: [...store.check_ins, checkIn],
  }));

  const checkIns = await getCheckIns();
  listeners.forEach(fn => fn(checkIns));

  return checkIn;
};

export const removeCheckIn = async (id: string): Promise<void> => {
  await setLocalData((store: Store) => ({
    check_ins: store.check_ins.filter(c => c.id !== id),
  }));

  const checkIns = await getCheckIns();
  listeners.forEach(fn => fn(checkIns));
};

export const editCheckIn = async (
  id: string,
  result: string,
): Promise<CheckIn | void> => {
  await setLocalData((store: Store) => ({
    check_ins: store.check_ins.map(ci => {
      if (ci.id !== id) return ci;

      return {
        ...ci,
        result,
      };
    }),
  }));

  const checkIns = await getCheckIns();
  listeners.forEach(fn => fn(checkIns));

  const checkIn = checkIns.find(ci => ci.id === id);
  return checkIn;
};

export const getCheckIns = async (): Promise<CheckIn[]> => {
  const store: Store = await getLocalData();
  return store.check_ins;
};
