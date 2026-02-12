export const getTodayWeekday = (format = "long", locale = "en-US") => {
  return new Date()
    .toLocaleDateString(locale, { weekday: format })
    .toLowerCase();
};
