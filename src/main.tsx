
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/globals.css'
import { CalendarView } from './components/Calendar/CalendarView'
import { sampleEvents } from './sampleData'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="p-6">
      <CalendarView
        events={sampleEvents}
        onEventAdd={(e)=>console.log('add', e)}
        onEventUpdate={(id, updates)=>console.log('update', id, updates)}
        onEventDelete={(id)=>console.log('delete', id)}
        initialView="month"
      />
    </div>
  </React.StrictMode>
)
