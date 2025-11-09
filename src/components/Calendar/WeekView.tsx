import React from 'react';
import { CalendarEvent } from '@/types/calendar.types';
import {
  addDays,
  startOfWeek,
  differenceInMinutes,
  isSameDay,
} from 'date-fns';
import { hours } from '@/utils/date.utils';

interface Props {
  anchorDate: Date;
  events: CalendarEvent[];
  onSlotCreate: (start: Date, end: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventDragStart: (event: CalendarEvent, ev: React.DragEvent) => void;
  onDropTimeSlot: (day: Date, hour: number) => void;
}

export const WeekView: React.FC<Props> = ({
  anchorDate,
  events,
  onSlotCreate,
  onEventClick,
  onEventDragStart,
  onDropTimeSlot,
}) => {
  const start = new Date(
  startOfWeek(anchorDate, { weekStartsOn: 0 }).setHours(0,0,0,0)
);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  /** ✅ Create an event in correct local time (no timezone shifting) */
  const handleClick = (day: Date, hour: number) => {
    const startLocal = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      hour,
      0,
      0,
      0
    );

    const endLocal = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      hour + 1,
      0,
      0,
      0
    );

    onSlotCreate(startLocal, endLocal);
  };

  /** Height of an hour row */
  const hourHeight = 64;

  return (
    <div className="grid grid-cols-[60px_1fr] h-[80vh]">

      {/* Empty left header column */}
      <div></div>

      {/* Day labels */}
      <div className="grid grid-cols-7 border-b">
        {days.map((d, i) => (
          <div key={i} className="border-l p-2 text-sm">
            {d.toDateString().slice(0, 10)}
          </div>
        ))}
      </div>

      {/* Hour labels */}
      <div className="border-r">
        {hours.map((h) => (
          <div
            key={h}
            className="h-16 border-t text-xs text-right pr-2 flex items-start pt-1"
          >
            {h}:00
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-7">
        {days.map((day, di) => (
          <div key={di} className="relative border-t border-l">

            {/* Slots for clicking and dropping */}
            {hours.map((h) => (
              <div
                key={h}
                className="h-16 border-t cursor-crosshair"
                onDoubleClick={() => handleClick(day, h)}

                onDragOver={(e) => e.preventDefault()}

                onDrop={() => onDropTimeSlot(day, h)}
              />
            ))}

            {/* EVENTS */}
            {events.filter((e) => isSameDay(e.startDate, day)).map((e) => {
              console.log(
  "EVENT:",
  e.title,
  "start =",
  e.startDate.toString(),
  "column day =",
  day.toString(),
  "sameDay? ->",
  isSameDay(e.startDate, day)
);
              
              const minutesFromStart =
                e.startDate.getHours() * 60 + e.startDate.getMinutes();

              
              const top = (minutesFromStart / 60) * hourHeight;

              
              const duration = differenceInMinutes(e.endDate, e.startDate);
              const height = (duration / 60) * hourHeight;

              return (
                <button
                  key={e.id}
                  draggable
                  onDragStart={(ev) => onEventDragStart(e, ev)}
                  className="absolute left-1 right-1 rounded text-xs p-1 overflow-hidden cursor-move shadow-sm"
                  style={{
                    top,
                    height,
                    backgroundColor: e.color || '#3b82f6',
                  }}
                  title={e.description}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    onEventClick(e);
                  }}
                >
                  {e.title}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
