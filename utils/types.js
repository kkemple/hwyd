export type Rating = 'GOOD' | 'BAD';

export type CheckInData = {
  date: string,
  result: Rating,
  note?: string,
};

export type CheckIn = CheckInData & {
  id: string,
};

export type Store = {
  check_ins: CheckIn[],
};
