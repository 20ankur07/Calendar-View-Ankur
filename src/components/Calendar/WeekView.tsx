
import React, { useMemo } from 'react';
import { CalendarEvent } from '@/types/calendar.types';
import { addDays, startOfWeek, setHours, setMinutes, differenceInMinutes } from 'date-fns'
import { hours } from '@/utils/date.utils';

interface Props {
  anchorDate: Date;
  events: CalendarEvent[];
  onSlotCreate: (start: Date, end: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventDragStart: (event: CalendarEvent, ev: React.DragEvent) => void;
  onDropTimeSlot: (day: Date, hour: number) => void;

}

export const WeekView: React.FC<Props> = ({ anchorDate, events, onSlotCreate, onEventClick, onEventDragStart, onDropTimeSlot  }) => {
  const start = startOfWeek(anchorDate, { weekStartsOn: 0 });
  const days = Array.from({length:7}, (_,i)=>addDays(start,i));

  const handleClick = (day: Date, hour: number) => {
    const s = setMinutes(setHours(day, hour), 0);
    const e = setMinutes(setHours(day, hour+1), 0);
    onSlotCreate(s, e);
  };

  return (
    <div className="grid grid-cols-[60px_1fr] h-[80vh]">
      <div></div>
      <div className="grid grid-cols-7 border-b">
        {days.map((d,i)=>(
          <div key={i} className="border-l p-2 text-sm">{d.toDateString().slice(0,10)}</div>
        ))}
      </div>
      <div className="border-r">
        {hours.map(h => (
          <div key={h} className="h-16 border-t text-xs text-right pr-2"
          onDoubleClick={() => handleClick(day, h)}
    onDragOver={(e) => e.preventDefault()}        // ✅ allow drop
    onDrop={() => onDropTimeSlot(day, h)} >{h}:00</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, di)=>(
          <div key={di} className="relative border-t border-l">
            {hours.map(h => (
              <div key={h} className="h-16 border-t cursor-crosshair" onDoubleClick={()=>handleClick(day, h)} />
            ))}
            {events.filter(e=> e.startDate.toDateString()===day.toDateString()).map(e=>{
              const top = (e.startDate.getHours()*60 + e.startDate.getMinutes())/60*64/1; // 64px per hour approx
              const mins = differenceInMinutes(e.endDate, e.startDate);
              const height = mins/60*64;
              return (
                <button
                  key={e.id}
                  draggable       // ✅ make event draggable
                  onDragStart={(ev) => onEventDragStart(e, ev)}   // ✅ notify parent drag started
                  className="absolute left-1 right-1 rounded text-xs p-1 overflow-hidden cursor-move"
                  style={{ top, height, backgroundColor: e.color || '#e5e7eb' }}
                  title={e.description}
                  onClick={(ev) => {
                    ev.stopPropagation();         // ✅ stops cell click from interfering
                    onEventClick(e);
                  }}
>
                {e.title}
              </button>

              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
