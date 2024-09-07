export default function formatDateDayMonthYear(dateString: string): string {
  const cappedDate = dateString.substring(0, dateString.indexOf("T"));
  const date = new Date(cappedDate);

  const day = date.getDay() <= 9 ? "0" + date.getDay() : date.getDay();
  const month = date.getMonth() <= 9 ? "0" + date.getMonth() : date.getMonth();

  return `${day}/${month}/${date.getFullYear()}`;
}
