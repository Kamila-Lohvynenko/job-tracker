export const formatDate = (value: string, locale: string) => {
  const date = new Date(value);

  return {
    dateLabel: new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date),
    timeLabel: new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "2-digit",
    }).format(date),
  };
};
