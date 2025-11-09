import { useCallback, useState } from 'react';

export type ViewMode = 'month' | 'week';

export const useCalendar = (
  initialDate: Date = new Date(),
  initialView: ViewMode = 'month'
) => {
  
  
  const safeDate = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);

  const [currentDate, setCurrentDate] = useState<Date>(safeDate(initialDate));
  const [view, setView] = useState<ViewMode>(initialView);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((d) =>
      safeDate(new Date(d.getFullYear(), d.getMonth() + 1, 1))
    );
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate((d) =>
      safeDate(new Date(d.getFullYear(), d.getMonth() - 1, 1))
    );
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(safeDate(new Date()));
  }, []);

  const switchView = useCallback((v: ViewMode) => {
    setView(v);
  }, []);

  return {
    currentDate,
    view,
    selectedDate,
    setSelectedDate,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    switchView,
  };
};
