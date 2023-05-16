export const compareDateOnly = (date1: Date, date2: Date): boolean => {
  const dateOnly1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const dateOnly2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  return dateOnly1.getTime() === dateOnly2.getTime();
}