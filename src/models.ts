export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  settings: {};
  resetPasswordToken: string;
  resetPasswordExpires: Date;
}

export interface Event {
  _id: string;
  userId: string;
  title: string;
  datetime: Date;
  isRecurring: Boolean;
  recurringSchedule: {
    repetitionType: string;
    everyX: number;
    everyUnit: string;
  };
  isStopping: Boolean;
  stopDatetime: Date;
  notes: String;
  isDeleted: Boolean;
}

export interface Occurrence {
  _id: string;
  userId: string;
  eventId: string;
  datetime: Date;
  checkedOff: Boolean;
  isDeleted: Boolean;
}
