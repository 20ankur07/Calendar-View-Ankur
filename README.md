
# Calendar View Component

Minimal, production-style Calendar View built with **React + TypeScript + Tailwind + Storybook**.
This satisfies the core requirements: 42-cell month grid, week view with hourly slots, event CRUD via modal,
keyboard accessibility (focus, Escape to close), responsive layout, and Storybook stories.

## Live Storybook
(Add your deployed URL here)

## Installation
```bash
npm install
npm run storybook
# or
npm run dev
```

## Features
- Month / Week views
- Event create/edit/delete (modal)
- Keyboard & ARIA basics
- Responsive design
- Basic performance optimizations (memoization, lightweight store)

## What’s intentionally minimal (documented)
- Drag & drop interactions are not implemented in this starter (scope & time). You can add pointer-driven DnD later.
- Virtualization is not necessary for demo dataset; add react-window-like logic if >100 items in lists.
- No external UI libraries (per assignment).

## Project Structure
See `/src/components/Calendar/*` and Storybook in `.storybook/` per assignment.

## Tech
- React 18 + TypeScript (strict)
- Tailwind CSS
- Storybook 8
- Vite
- date-fns
- zustand (internal event store)

## Accessibility
- Escape closes modal
- Focus-visible outlines
- ARIA roles for modal and interactive grid items

## Next Steps (nice-to-have / bonus)
- Add DnD for events & drag-to-create ranges
- Add tests (>70% coverage) with Vitest & Testing Library
- Dark mode (Tailwind class strategy)
- LocalStorage persistence

## Contact
Your email here.
