
import React, { useCallback, useMemo } from 'react';
import { CalendarEvent } from '@/types/calendar.types';
import { fmt } from '@/utils/date.utils';
import { sameDay } from '@/utils/event.utils';

interface Props {
  date: Date;
  events: CalendarEvent[];
  isToday: boolean;
  isMuted: boolean;
  onDayClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
  onEventDragStart: (event: CalendarEvent, ev: React.DragEvent) => void;
}

export const CalendarCell: React.FC<Props> = React.memo(({ date, events, isToday, isMuted, onDayClick, onEventClick,onEventDragStart }) => {
  const handleClick = useCallback(()=> onDayClick(date), [date, onDayClick]);
  const display = useMemo(()=>events.slice(0,3), [events]);

  return (
    <div
      className={"border border-neutral-200 h-32 p-2 hover:bg-neutral-50 transition-colors cursor-pointer " + (isMuted ? 'bg-neutral-50 text-neutral-500' : '')}
      role="button"
      tabIndex={0}
      aria-label={`${fmt(date,'MMMM')} ${fmt(date,'d')}, ${fmt(date,'yyyy')}. ${events.length} events.`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-1">
        <span className={"text-sm font-medium " + (isMuted ? 'text-neutral-500' : 'text-neutral-900')}>{fmt(date)}</span>
        {isToday && <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">{fmt(date)}</span>}
      </div>
      <div className="space-y-1 overflow-hidden">
        {display.map(e => (
          <button key={e.id} draggable onDragStart={(ev) => onEventDragStart(e, ev)}   className="text-xs px-2 py-1 rounded truncate w-full text-left"
            style={{ backgroundColor: e.color || '#e5e7eb' }}
            title={e.description}
            onClick={(ev)=>{ ev.stopPropagation(); onEventClick(e); }}
          >
            {e.title}
          </button>
        ))}
        {events.length > 3 && (
          <span className="text-xs text-primary-600">+{events.length-3} more</span>
        )}
      </div>
    </div>
  )
});
