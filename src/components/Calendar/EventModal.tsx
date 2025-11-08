
import React, { useEffect, useState } from 'react';
import { CalendarEvent } from '@/types/calendar.types';
import { Modal } from '../primitives/Modal';
import { Button } from '../primitives/Button';

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent,'id'>, id?: string) => void;
  onDelete?: (id: string) => void;
  initial?: CalendarEvent | { startDate: Date; endDate: Date };
}

export const EventModal: React.FC<Props> = ({ open, onClose, onSave, onDelete, initial }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [color, setColor] = useState('#0ea5e9');
  const [category, setCategory] = useState('General');
  const editingId = (initial as CalendarEvent)?.id;

  useEffect(()=>{
    if (!open) return;
    if (initial && 'startDate' in initial) {
      const s = (initial as any).startDate as Date;
      const e = (initial as any).endDate as Date;
      setStart(new Date(s).toISOString().slice(0,16));
      setEnd(new Date(e).toISOString().slice(0,16));
    }
    if ((initial as CalendarEvent)?.title) {
      const ev = initial as CalendarEvent;
      setTitle(ev.title||'');
      setDescription(ev.description||'');
      setColor(ev.color||'#0ea5e9');
      setCategory(ev.category||'General');
    }
  }, [open, initial]);

  const handleSave = () => {
    if (!title.trim()) return;
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (endDate <= startDate) return;
    onSave({ title, description, startDate, endDate, color, category }, editingId);
    onClose();
  };

  const canDelete = !!editingId && onDelete;

  return (
    <Modal open={open} onClose={onClose} title={editingId ? 'Edit Event' : 'Create Event'}>
      <div className="space-y-3" id="modal-description">
        <input aria-label="Title" maxLength={100} className="w-full border rounded px-2 py-1" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea aria-label="Description" maxLength={500} className="w-full border rounded px-2 py-1" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <label className="text-sm">Start
            <input type="datetime-local" className="w-full border rounded px-2 py-1" value={start} onChange={e=>setStart(e.target.value)} />
          </label>
          <label className="text-sm">End
            <input type="datetime-local" className="w-full border rounded px-2 py-1" value={end} onChange={e=>setEnd(e.target.value)} />
          </label>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm inline-flex items-center gap-2">Color
            <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
          </label>
          <label className="text-sm inline-flex items-center gap-2">Category
            <input className="border rounded px-2 py-1" value={category} onChange={e=>setCategory(e.target.value)} />
          </label>
        </div>
        <div className="flex justify-between pt-2">
          {canDelete ? <Button variant="danger" onClick={()=>{ onDelete!(editingId!); onClose(); }}>Delete</Button> : <span />}
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
