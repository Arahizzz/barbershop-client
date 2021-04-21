export function formatTime(time: Date): string {
  return (
    (time.getHours() < 10 ? "0" + time.getHours() : time.getHours()) +
    ":" +
    (time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes())
  );
}

export function formatDateTime(dateTime: Date): string {
  return `${dateTime.toDateString()} ${formatTime(dateTime)}`;
}
