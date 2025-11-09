import type { Meta, StoryObj } from "@storybook/react";
import { WeekView } from "./WeekView";
import { CalendarEvent } from "@/types/calendar.types";

const meta: Meta<typeof WeekView> = {
  title: "Calendar/WeekView",
  component: WeekView
};

export default meta;
type Story = StoryObj<typeof WeekView>;

const events: CalendarEvent[] = [
  {
    id: "1",
    title: "Meeting",
    description: "Client demo",
    startDate: new Date(2025, 10, 10, 15),
    endDate: new Date(2025, 10, 10, 17),
    color: "#38bdf8"
  }
];

export const Default: Story = {
  args: {
    anchorDate: new Date(2025, 10, 10),
    events,
    onSlotCreate: () => {},
    onEventClick: () => {},
    onEventDragStart: () => {},
    onDropTimeSlot: () => {}
  }
};
