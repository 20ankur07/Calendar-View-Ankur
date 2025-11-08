
import { useRef, useState, useCallback } from 'react'
import { CalendarEvent } from '@/types/calendar.types'

export const useEventManager = (initial: CalendarEvent[]) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initial)
  const idRef = useRef(1000)

  const add = useCallback((e: Omit<CalendarEvent,'id'>) => {
    const event = { ...e, id: `evt-${idRef.current++}` }
    setEvents(prev => [...prev, event])
    return event
  }, [])

  const update = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    setEvents(prev => prev.map(e => e.id===id ? { ...e, ...updates } : e))
  }, [])

  const remove = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id!==id))
  }, [])

  return { events, add, update, remove }
}
