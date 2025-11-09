
import React, { useMemo, useState, useEffect } from 'react';
import { CalendarViewProps, CalendarEvent } from '@/types/calendar.types';
import { useCalendar } from '@/hooks/useCalendar';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { Button } from '../primitives/Button';
import { EventModal } from './EventModal';
import { format } from 'date-fns'
import { useEventManager } from '@/hooks/useEventManager';

export const CalendarView: React.FC<CalendarViewProps> = ({
  events: initialEvents,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = 'month',
  initialDate = new Date(),
}) => {
  const { currentDate, view, switchView, goToNextMonth, goToPreviousMonth, goToToday } = useCalendar(initialDate, initialView);
  const { events, add, update, remove } = useEventManager(initialEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitial, setModalInitial] = useState<any>(null);

  const header = useMemo(()=> ({
    title: format(currentDate, view==='month' ? 'MMMM yyyy' : `'Week of' MMM d, yyyy`)
  }), [currentDate, view]);

  const handleCreateForDay = (date: Date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0);
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0);
    setModalInitial({ startDate: start, endDate: end });
    setModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setModalInitial(event);
    setModalOpen(true);
  };

  const [dragData, setDragData] = useState<{
  event: CalendarEvent;
  offsetX: number;
  offsetY: number;
} | null>(null);

const [mouse, setMouse] = useState({ x: 0, y: 0 });


  const handleSave = (payload: Omit<CalendarEvent,'id'>, id?: string) => {
    if (id) {
      update(id, payload);
      onEventUpdate(id, payload);
    } else {
      const ev = add(payload);
      onEventAdd(ev);
    }
  };

  const onEventDragStart = (event: CalendarEvent, ev: React.DragEvent) => {
  const rect = (ev.target as HTMLElement).getBoundingClientRect();
  setDragData({
    event,
    offsetX: ev.clientX - rect.left,
    offsetY: ev.clientY - rect.top,
  });
};

  const onDropDay = (targetDate: Date) => {
  if (!dragData) return;

  const duration =
    dragData.event.endDate.getTime() - dragData.event.startDate.getTime();

  const newStart = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    dragData.event.startDate.getHours(),
    dragData.event.startDate.getMinutes()
  );

  const newEnd = new Date(newStart.getTime() + duration);

  update(dragData.event.id, { startDate: newStart, endDate: newEnd });
  onEventUpdate(dragData.event.id, { startDate: newStart, endDate: newEnd });

  setDragData(null);
};



  const handleDelete = (id: string) => {
    remove(id);
    onEventDelete(id);
  };
  useEffect(() => {
  const move = (e: MouseEvent) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };
  window.addEventListener("mousemove", move);
  return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-card p-4 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button onClick={goToPreviousMonth} aria-label="Previous period">◀</Button>
          <Button onClick={goToToday} aria-label="Go to today">Today</Button>
          <Button onClick={goToNextMonth} aria-label="Next period">▶</Button>
        </div>
        <h1 className="text-xl font-semibold">{header.title}</h1>
        <div className="flex items-center gap-2">
          <Button variant={view==='month'?'primary':'ghost'} onClick={()=>switchView('month')} aria-pressed={view==='month'}>Month</Button>
          <Button variant={view==='week'?'primary':'ghost'} onClick={()=>switchView('week')} aria-pressed={view==='week'}>Week</Button>
        </div>
      </div>

      {view==='month' ? (
        <MonthView monthDate={currentDate} events={events} onDayClick={handleCreateForDay} onEventClick={handleEventClick} onEventDragStart={onEventDragStart} onDropDay={onDropDay}
/>
      ) : (
        <WeekView anchorDate={currentDate} events={events} onSlotCreate={(s,e)=>{ setModalInitial({ startDate: s, endDate: e }); setModalOpen(true); }} onEventClick={handleEventClick}  onEventDragStart={onEventDragStart} onDropTimeSlot={onDropTimeSlot}
 />
      )}

      <EventModal
        open={modalOpen}
        onClose={()=>setModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        initial={modalInitial}
      />
    </div>
  )
}
