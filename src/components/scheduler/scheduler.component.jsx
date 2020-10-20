import React from 'react';
import { connect } from 'react-redux';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import './scheduler.styles.scss';

const Scheduler = () => {
  const handleEventClick = (event) => {
    console.log(event)
  }

  return (
    <FullCalendar
      plugins={[timeGridPlugin]}
      // headerToolbar={{
      //   left: 'prev,next today',
      //   center: 'title',
      //   right: 'dayGridMonth,timeGridWeek,timeGridDay'
      // }}
      initialView='timeGridWeek'
      editable={true}
      selectable={true}
      // selectMirror={true}
      // dayMaxEvents={true}
      // weekends={this.state.weekendsVisible}
      // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
      select={handleEventClick}
      eventContent={handleEventClick} // custom render function
      eventClick={handleEventClick}
      eventsSet={handleEventClick} // called after events are initialized/added/changed/removed
      /* you can update a remote database when these fire:
      eventAdd={function(){}}
      eventChange={function(){}}
      eventRemove={function(){}}
      */
    />
  )
};
 
export default Scheduler;
