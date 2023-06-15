
import { format, parseISO } from 'date-fns';

export default function useDateUtils() {
  const formatDateToDayOfWeek = (dateString) => {
    const date = parseISO(dateString);
    const formattedDate = format(date, 'EEEE');
    return formattedDate;
  };
  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    const formattedDate = format(date, 'dd MMM yyyy');
    return formattedDate;
  };
  return {
    formatDateToDayOfWeek,
    formatDate
  };
}
