
import { addDays, addMonths, endOfMonth, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from 'date-fns'

export const fmt = (d: Date, f='d') => format(d, f)

export const getCalendarGrid = (date: Date): Date[] => {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
  const days: Date[] = [];
  for (let i=0; i<42; i++) days.push(addDays(start, i));
  return days;
};

export const isToday = (d: Date) => isSameDay(d, new Date());
export const inSameMonth = (d: Date, ref: Date) => isSameMonth(d, ref);
export const nextMonth = (d: Date) => addMonths(d, 1);
export const prevMonth = (d: Date) => addMonths(d, -1);

export const hours = Array.from({length:24}, (_,h)=>h);
