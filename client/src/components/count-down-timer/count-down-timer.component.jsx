import React, { useState, useEffect } from 'react';

const CountDownTimer = ({ children, startTime, text }) => {
  const calculateTimeLeft = () => {
    const difference = startTime - (new Date()).getTime();
    //console.log((new Date()).toLocaleDateString('tr-TR'), (new Date()).toLocaleTimeString('tr-TR'));
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, index) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={index}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>{text} {timerComponents.length ? timerComponents : children }</div>
  );
}

export default CountDownTimer;
