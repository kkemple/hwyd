import cuid from 'cuid';

import { setLocalData, getLocalData } from './storage';
import type { Store, CheckIn, CheckInData } from './types';

export const addCheckIn = (checkIn: CheckInData): Promise<void> =>
  setLocalData((store: Store) => ({
    check_ins: [...store.check_ins, { ...checkIn, id: cuid() }],
  }));

export const removeCheckIn = (id: string): Promise<void> =>
  setLocalData((store: Store) => ({
    check_ins: store.check_ins.filter(c => c.id !== id),
  }));

export const getCheckIns = async (): CheckIn[] => {
  const store: Store = await getLocalData();
  return store.check_ins;
};
