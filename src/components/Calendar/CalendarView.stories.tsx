
import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import { sampleEvents } from '@/sampleData';

const meta: Meta<typeof CalendarView> = {
  title: 'Calendar/CalendarView',
  component: CalendarView,
  parameters: { layout: 'fullscreen' }
};
export default meta;

export const Default: StoryObj<typeof CalendarView> = {
  args: { events: sampleEvents, onEventAdd: ()=>{}, onEventUpdate: ()=>{}, onEventDelete: ()=>{}, initialView: 'month' }
};

export const Empty: StoryObj<typeof CalendarView> = {
  args: { events: [], onEventAdd: ()=>{}, onEventUpdate: ()=>{}, onEventDelete: ()=>{}, initialView: 'month' }
};

export const WeekViewStory: StoryObj<typeof CalendarView> = {
  args: { events: sampleEvents, onEventAdd: ()=>{}, onEventUpdate: ()=>{}, onEventDelete: ()=>{}, initialView: 'week' }
};

export const ManyEvents: StoryObj<typeof CalendarView> = {
  args: {
    events: Array.from({length:25}, (_,i)=> ({
      id: 'evt-'+i,
      title: 'Event '+i,
      startDate: new Date(2024,0,15, (i%8)+8, 0),
      endDate: new Date(2024,0,15, (i%8)+9, 0),
      color: ['#3b82f6','#10b981','#f59e0b','#8b5cf6'][i%4],
    })),
    onEventAdd: ()=>{}, onEventUpdate: ()=>{}, onEventDelete: ()=>{}, initialView: 'month'
  }
};

export const InteractivePlayground: StoryObj<typeof CalendarView> = {
  args: { events: sampleEvents, onEventAdd: ()=>{}, onEventUpdate: ()=>{}, onEventDelete: ()=>{}, initialView: 'month' }
};
