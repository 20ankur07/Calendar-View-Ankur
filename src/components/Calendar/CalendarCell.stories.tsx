import type { Meta, StoryObj } from "@storybook/react";
import { CalendarCell } from "./CalendarCell";
import { CalendarEvent } from "@/types/calendar.types";

const meta: Meta<typeof CalendarCell> = {
  title: "Calendar/CalendarCell",
  component: CalendarCell
};

export default meta;
type Story = StoryObj<typeof CalendarCell>;

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Meeting",
    description: "Project sync",
    startDate: new Date(),
    endDate: new Date(),
    color: "#60a5fa"
  }
];

export const Default: Story = {
  args: {
    date: new Date(),
    events: sampleEvents,
    isToday: true,
    isMuted: false,
    onDayClick: () => alert("Day clicked!"),
    onEventClick: () => alert("Event clicked!"),
    onEventDragStart: () => {}
  }
};
