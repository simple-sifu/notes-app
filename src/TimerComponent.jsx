import React, { useEffect, useState } from "react";

export function Timer({initial}) {
  
  const [timerValue, setTimerValue] = useState(initial);
  const [stopTimer, setStopTimer] = useState(false);

  // The value starts to decrease when the component is mounted
  // initial value of timer = prop.initial
  // value reaches 0 is should stop
  // The STop timer button stops the timer as its current value.
  useEffect(() => {
    if (stopTimer){
        return;
    }
    const interValid = setInterval(()=>{
      setTimerValue((value)=>{
        if (value === 0){
          return 0;
        }
        return value-1;
      })
    }, 1000)
    return () => clearInterval(interValid)
  },[stopTimer])

  const stopTimerHandler = () => {
    setStopTimer(!stopTimer)
  }

	return (
		<div className="mt-100 layout-column align-items-center justify-content-center">
			<div className="timer-value" data-testid="timer-value">{timerValue}</div>
			<button className="large" data-testid="stop-button" onClick={() => {stopTimerHandler()}}>Stop Timer</button>
		</div>
	);

}