export const calcEndTime = (start: Date, duration: Date) => {
  const hours1 = start.getHours();
  const minutes1 = start.getMinutes();

  const hours2 = duration.getHours();
  const minutes2 = duration.getMinutes();

  let totalHours = hours1 + hours2;
  let totalMinutes = minutes1 + minutes2;

  if (totalMinutes >= 60) {
    const additionalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    totalHours += additionalHours;
    totalMinutes = remainingMinutes;
  }

  const resultDate = new Date();
  resultDate.setHours(totalHours);
  resultDate.setMinutes(totalMinutes);
  return resultDate;
}