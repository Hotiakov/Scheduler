export const setDayStart = (date: Date) => {
  date.setHours(0, 0, 0);
  return date;
};

export const setDayEnd = (date: Date) => {
  date.setHours(23, 59, 59);
  return date;
};

export const setDayMonday = (date: Date) => {
  const dayOfWeek = date.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diffToMonday, 0, 0, 0);
}

export const setDaySunday = (date: Date) => {
  const dayOfWeek = date.getDay();
  const diffToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diffToSunday, 23, 59, 59);
}

export const setFirstMonthDay = (date: Date) => {
  date.setDate(1);
  date.setHours(0, 0, 0);
  return date;
}
export const setLastMonthDay = (date: Date) => {
  date.setDate(32);
  date.setDate(0);
  date.setHours(23, 59, 59);
  return date;
}