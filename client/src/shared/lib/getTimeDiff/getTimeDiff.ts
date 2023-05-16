
export const getTimeDiff = (start: Date, duration: Date) => {
  const startDate = new Date(start);
  const timeDiff = new Date(duration);
  const hours1 = startDate.getHours();
  const minutes1 = startDate.getMinutes();

  const hours2 = timeDiff.getHours();
  const minutes2 = timeDiff.getMinutes();

  let totalHours = hours1 - hours2;
  let totalMinutes = minutes1 - minutes2;

  if (totalMinutes < 0) {
    totalHours--;
    const remainingMinutes = totalMinutes + 60;
    totalMinutes = remainingMinutes;
  }

  const resultDate = new Date();
  resultDate.setHours(totalHours);
  resultDate.setMinutes(totalMinutes);

  return resultDate;
};