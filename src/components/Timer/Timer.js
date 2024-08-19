import React, {useState} from "react";
import classes from './Timer.module.css'

const Timer = ()=> {
    const [state, setState] = useState({
        currentTime:{
            hours:0,
            minutes:0,
            seconds:0,
            milliseconds:0,
            days : 0,
        },
        startButtonText: 'Start',
        dayText: '',
        intervalId:null
    })

const startTimer = ()=> {
    if (state.startButtonText === 'Pause'){
        stopTimer();
        return;
    }

    setState((prevState) => ({...prevState, startButtonText: 'Pause'}));
    const now = new Date().getTime();
    const prevTime = (state.currentTime.days * 86400000) + (state.currentTime.hours * 3600000) + (state.currentTime.minutes * 60000) + (state.currentTime.seconds * 1000) + (state.currentTime.milliseconds);
    const id = setInterval(() => {
        if(state.currentTime.hours >=24)
            setState((prevState) => ({...prevState, dayText: 'DD : '}));

        let elapsedTime = new Date().getTime() - now + prevTime;
        setState((prevState) => ({...prevState,
            currentTime: {
                days: Math.floor((elapsedTime / 86400000) % 30),
                hours: Math.floor((elapsedTime / 3600000) % 24),
                minutes: Math.floor((elapsedTime / 60000) % 60),
                seconds: Math.floor((elapsedTime / 1000) % 60),
                milliseconds: elapsedTime % 1000
            }
        }));
    }, 1);

    setState((prevState) => ({...prevState, intervalId: id}));
}

const stopTimer = ()=> {
    if(state.intervalId){
        clearInterval(state.intervalId);
        setState((prevState) => ({...prevState, startButtonText: 'Resume', isActive:false, intervalId: null}));
    }
}

const resetTimer = ()=> {
    if(state.intervalId) clearInterval(state.intervalId);
    setState({
        currentTime:{
            hours:0,
            minutes:0,
            seconds:0,
            milliseconds:0,
            days : 0,
        },
        startButtonText: 'Start',
        dayText: '',
        intervalId:null
    });
}

    return (
        <div className={classes.stopwatch}>
            <h3 className = {classes.timer}>{state.dayText}HH : MM : SS : MS</h3>
            <h1 className = {classes.timer}>
                {state.currentTime.days!== 0 ? `${state.currentTime.days.toString().padStart(2, '0')}:`: null}
                {state.currentTime.hours.toString().padStart(2,'0')}:
                {state.currentTime.minutes.toString().padStart(2,'0')}:
                {state.currentTime.seconds.toString().padStart(2,'0')}:
                {state.currentTime.milliseconds.toString().padStart(3,'0')}
            </h1>
            <div>
                <button onClick = {startTimer}>{state.startButtonText}</button>
                {/* <button onClick = {stopTimer}>Stop</button> */}
                {/* <button>Resume</button> */}
                <button onClick = {resetTimer}>Reset</button>
            </div>
            
        </div>
    )
}

export default Timer;