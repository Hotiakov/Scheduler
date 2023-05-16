export const generateMonthDays = (from: Date, to: Date): Date[] => {
  const days = [];
  for (let date = new Date(from); date <= to; date.setDate(date.getDate() + 1)) {
    days.push(new Date(date));
  }
  return days;
};