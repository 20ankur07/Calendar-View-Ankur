
import React from 'react';
import { CalendarEvent } from '@/types/calendar.types';
import { byDay } from '@/utils/event.utils';
import { getCalendarGrid, inSameMonth, isToday,  } from '@/utils/date.utils';
import { CalendarCell } from './CalendarCell';

interface Props {
  monthDate: Date;
  events: CalendarEvent[];
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventDragStart: (event: CalendarEvent, ev: React.DragEvent) => void;
  onDropDay: (day: Date) => void;
}


export const MonthView: React.FC<Props> = ({ monthDate, events, onDayClick, onEventClick,onEventDragStart,onDropDay   }) => {
  const grid = getCalendarGrid(monthDate);
  const weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 text-xs text-neutral-600 px-2 py-1">
        {weekDays.map(d => <div key={d} className="p-2">{d}</div>)}
      </div>
      <div className="grid grid-cols-7">
        {grid.map((day, i) => {
          const dayEvents = byDay(events, day);
          return (
            <div
          key={i}
          onDragOver={(e) => e.preventDefault()}     
          onDrop={() => onDropDay(day)}              
          className="h-full"
        >
            <CalendarCell
              
              date={day}
              events={dayEvents}
              isToday={isToday(day)}
              isMuted={!inSameMonth(day, monthDate)}
              onDayClick={onDayClick}
              onEventClick={onEventClick}
              onEventDragStart={onEventDragStart}
            />
            </div>
          )
        })}
      </div>
    </div>
  )
}
