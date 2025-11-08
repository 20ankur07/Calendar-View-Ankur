
import { useCallback, useState } from 'react';

export type ViewMode = 'month' | 'week';

export const useCalendar = (initialDate: Date = new Date(), initialView: ViewMode='month') => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [view, setView] = useState<ViewMode>(initialView);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goToNextMonth = useCallback(()=> setCurrentDate(d => new Date(d.getFullYear(), d.getMonth()+1, 1)), []);
  const goToPreviousMonth = useCallback(()=> setCurrentDate(d => new Date(d.getFullYear(), d.getMonth()-1, 1)), []);
  const goToToday = useCallback(()=> setCurrentDate(new Date()), []);
  const switchView = useCallback((v: ViewMode)=> setView(v), []);

  return { currentDate, view, selectedDate, setSelectedDate, goToNextMonth, goToPreviousMonth, goToToday, switchView };
}
