export type Rating = "GOOD" | "BAD";

export type CheckInData = {
  date: Date,
  rating: Rating,
  note?: string
};

export type CheckIn = CheckInData & {
  id: string
};

export type Store = {
  check_ins: CheckIn[]
};
