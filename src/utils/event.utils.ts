
import { CalendarEvent } from '@/types/calendar.types'

export const byDay = (events: CalendarEvent[], day: Date) => {
  return events.filter(e => sameDay(e.startDate, day));
};

export const sameDay = (a: Date, b: Date) =>
  a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();

export const sortByStart = (events: CalendarEvent[]) =>
  [...events].sort((a,b)=>a.startDate.getTime()-b.startDate.getTime());
