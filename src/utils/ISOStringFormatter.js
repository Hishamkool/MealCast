function isoStringFormatter(deadlineISO) {
  if (!deadlineISO) {
    return { date: "no deadline string", time: "" };
  }

  const date = new Date(deadlineISO);
  if (isNaN(date.getTime())) {
    return {
      date: "invalid date",
      time: "",
    };
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",

    hour12: true,
  });

  return {
    date: formattedDate,
    time: formattedTime,
  };
}
export default isoStringFormatter;
