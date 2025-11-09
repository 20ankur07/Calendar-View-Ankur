
# Calendar View Component

A customizable and interactive calendar UI supporting Month and Week views with event creation, editing, and drag-and-drop functionality.

## Live Storybook
deployed Storybook is available here:

👉 https://calendar-component-f2af1uwp4-ankurs-projects-92c2fb90.vercel.app/


## Installation
```bash
npm install
npm run storybook
# or
npm run dev
```


## Architecture
CalendarView.tsx – Core controller that manages navigation, view switching, event handling, and passes data to Month/Week views.

MonthView / WeekView – Grid-based visual layouts for viewing events by month or week.

CalendarCell – Reusable building block for rendering day cells and events inside the month view.

useCalendar Hook – Handles date navigation, view mode, and selected date state.

useEventManager Hook – Manages events (add, update, delete) with internal state to keep UI reactive.

EventModal – UI for creating and editing events.

Utilities – Date calculation + event grouping utilities for consistent behavior.

## Features
- Month / Week views
- Event create/edit/delete (modal)
- Keyboard & ARIA basics
- Drag and drop event rescheduling 
- Responsive design
- Basic performance optimizations (memoization, lightweight store)
- Storybook integration for component testing & documentation

## StoryBook Stories

The Storybook setup includes multiple scenarios:
- Default – Calendar with sample events in Month view
- Empty – Calendar with zero events
- WeekViewStory – Calendar starting directly in Week view
- ManyEvents – Stress test with 25 simultaneous events
- InteractivePlayground – Fully interactive version for testing behavior

## Tech
- React 18 + TypeScript (strict)
- Tailwind CSS
- Storybook 8
- Vite
- date-fns
- zustand (internal event store)

## Contact
- ankurgiri76555@gmail.com
