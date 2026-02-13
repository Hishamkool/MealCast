export function calculateDeadlineISO(cutoffTime, offset) {
  const now = new Date();
  const deadline = new Date(now); //copu of todayy

  deadline.setDate(now.getDate() - offset); // 0 for same day 1 for previous day
  const [hours, minutes] = cutoffTime.split(":").map(Number);

  deadline.setHours(hours, minutes, 0, 0);

  return deadline.toISOString();
}
