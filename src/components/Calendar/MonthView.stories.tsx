import type { Meta, StoryObj } from "@storybook/react";
import { MonthView } from "./MonthView";
import { CalendarEvent } from "@/types/calendar.types";

const meta: Meta<typeof MonthView> = {
  title: "Calendar/MonthView",
  component: MonthView
};

export default meta;
type Story = StoryObj<typeof MonthView>;

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Team Meeting",
    description: "Weekly sync",
    startDate: new Date(2025, 10, 10, 10),
    endDate: new Date(2025, 10, 10, 11),
    color: "#60a5fa"
  }
];

export const Default: Story = {
  args: {
    monthDate: new Date(2025, 10, 1),
    events,
    onDayClick: () => alert("Day clicked!"),
    onEventClick: () => alert("Event clicked!"),
    onEventDragStart: () => {},
    onDropDay: () => {}
  }
};
