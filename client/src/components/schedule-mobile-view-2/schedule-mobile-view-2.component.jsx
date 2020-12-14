import React from 'react';
import { connect } from 'react-redux';

import './schedule-mobile-view-2.styles.scss';

const ScheduleView2 = () => {
  const handleEventClick = (event) => {
    console.log(event)
  }

  return (
    <div className='container'>
      <input type='radio' name='tabs' id='Mon' />
      <label htmlFor='Mon'><div className='content'>Hello, I'm Monday</div></label>
      <input type='radio' name='tabs' id='Tue' />
      <label htmlFor='Tue'><div className='content'>Hello, I'm Tuesday</div></label>
      <input type='radio' name='tabs' id='Wed' />
      <label htmlFor='Wed'><div className='content'>Hello, I'm Wednesday</div></label>
      <input type='radio' name='tabs' id='Thu' />
      <label htmlFor='Thu'><div className='content'>Hello, I'm Thursday</div></label>
      <input type='radio' name='tabs' id='Fri' />
      <label htmlFor='Fri'><div className='content'>Hello, I'm Friday</div></label>
      <input type='radio' name='tabs' id='Sat' />
      <label htmlFor='Sat'><div className='content'>Hello, I'm Saturday</div></label>
      <input type='radio' name='tabs' id='Sun' />
      <label htmlFor='Sun'><div className='content'>Hello, I'm Sunday</div></label>
    </div>
  )
};
 
export default ScheduleView2;
