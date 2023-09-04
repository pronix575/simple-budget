export const getWeekendDay = (day: number) => {
  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Cреда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];

  return days[day];
};
