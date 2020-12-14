import React, { useState } from 'react';
import { connect } from 'react-redux';

import './schedule-view.styles.scss';

const ScheduleView = () => {
  const [selectedHours, setSelectedHours] = useState([]);
  const hours = [
    '09:00', '09:30', '10:00', 
    '10:30', '11:00', '11:30', 
    '12:00', '12:30', '13:00', 
    '13:30', '14:00', '14:30', 
    '15:00', '15:30', '16:00', 
    '16:30', '17:00', '17:30', 
    '18:00', '18:30', '19:00', 
    '19:30', '20:00', '20:30', 
    '21:00', '21:30'
  ];
  const handleEventClick = (day, hour) => {
    if(selectedHours.filter((time) => time.day === day  && time.hour === hour).length > 0) {
      setSelectedHours([...selectedHours.filter((time) => time.day !== day || time.hour !== hour)]);
    }
    else {
      setSelectedHours([...selectedHours, {day, hour}]);
    }
  }

  return (
    <div className='table-container'>
      <table className='schedule-view'>
        <thead>
          <tr>
            <th className='fc-col-header-axis'><div className='fc-col-header-axis'>&nbsp;</div></th>
            <th className='fc-col-header-cell-cushion'><div className='fc-col-header-cell-cushion'>Sun</div></th>
            <th className='fc-col-header-cell-cushion'><div className='fc-col-header-cell-cushion'>Mon</div></th>
            <th className='fc-col-header-cell-cushion'><div className='fc-col-header-cell-cushion'>Tue</div></th>
            <th className='fc-col-header-cell-cushion'><div className='fc-col-header-cell-cushion'>Wed</div></th>
            <th className='fc-col-header-cell-cushion'><div className='fc-col-header-cell-cushion'>Thu</div></th>
            <th className='fc-col-header-cell-cushion'><div className='fc-col-header-cell-cushion'>Fri</div></th>
            <th className='fc-col-header-cell-cushion'><div className='fc-col-header-cell-cushion'>Sat</div></th>
          </tr>
        </thead>
        <tbody>
          <tr className='fc-timegrid-divider'>
            <td className='fc-timegrid-divider'></td>
            <td className='fc-timegrid-divider'></td>
            <td className='fc-timegrid-divider'></td>
            <td className='fc-timegrid-divider'></td>
            <td className='fc-timegrid-divider'></td>
            <td className='fc-timegrid-divider'></td>
            <td className='fc-timegrid-divider'></td>
            <td className='fc-timegrid-divider'></td>
          </tr>
          {
            hours.map((hour) => (
              <tr key={hour}>
                <td>{hour}</td>
                <td className={selectedHours.filter((time) => time.day === 1 && time.hour === hour).length > 0 ? 'selected-slot' : ''} onClick={() => handleEventClick(1, hour)}></td>
                <td className={selectedHours.filter((time) => time.day === 2 && time.hour === hour).length > 0 ? 'selected-slot' : ''} onClick={() => handleEventClick(2, hour)}></td>
                <td className={selectedHours.filter((time) => time.day === 3 && time.hour === hour).length > 0 ? 'selected-slot' : ''} onClick={() => handleEventClick(3, hour)}></td>
                <td className={selectedHours.filter((time) => time.day === 4 && time.hour === hour).length > 0 ? 'selected-slot' : ''} onClick={() => handleEventClick(4, hour)}></td>
                <td className={selectedHours.filter((time) => time.day === 5 && time.hour === hour).length > 0 ? 'selected-slot' : ''} onClick={() => handleEventClick(5, hour)}></td>
                <td className={selectedHours.filter((time) => time.day === 6 && time.hour === hour).length > 0 ? 'selected-slot' : ''} onClick={() => handleEventClick(6, hour)}></td>
                <td className={selectedHours.filter((time) => time.day === 7 && time.hour === hour).length > 0 ? 'selected-slot' : ''} onClick={() => handleEventClick(7, hour)}></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
};
 
export default ScheduleView;
