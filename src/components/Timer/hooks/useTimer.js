import  { useState } from 'react'
import TIME_CONSTANTS from '../data/data';

const {
    MILLISECONDS_IN_A_DAY,
    MILLISECONDS_IN_AN_HOUR,
    MILLISECONDS_IN_A_MINUTE,
    MILLISECONDS_IN_A_SECOND,
    DAYS_IN_A_MONTH,
    HOURS_IN_A_DAY,
    MINUTES_IN_AN_HOUR,
    SECONDS_IN_A_MINUTE
} = TIME_CONSTANTS;

const useTimer = () => {
    const initialState = {
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
    }

    const [state, setState] = useState(initialState);

    const getPreviousTime = () => {
        setState((prevState) => ({...prevState, startButtonText: 'Pause'}));
        const now = new Date().getTime();
        const prevTime = (state.currentTime.days * MILLISECONDS_IN_A_DAY) + (state.currentTime.hours * MILLISECONDS_IN_AN_HOUR) + (state.currentTime.minutes * MILLISECONDS_IN_A_MINUTE) + (state.currentTime.seconds * MILLISECONDS_IN_A_SECOND) + (state.currentTime.milliseconds);
        return prevTime-now;
    }

    const startTimer = ()=> {
        if (state.startButtonText === 'Pause'){
            stopTimer();
            return;
        }
        const prevTime = getPreviousTime();
        const id = setInterval(() => {
            if(state.currentTime.hours >=24)
                setState((prevState) => ({...prevState, dayText: 'DD : '}));

            let elapsedTime = new Date().getTime() + prevTime;
            setState((prevState) => ({...prevState,
                currentTime: {
                    days: Math.floor((elapsedTime / MILLISECONDS_IN_A_DAY) % DAYS_IN_A_MONTH),
                    hours: Math.floor((elapsedTime / MILLISECONDS_IN_AN_HOUR) % HOURS_IN_A_DAY),
                    minutes: Math.floor((elapsedTime / MILLISECONDS_IN_A_MINUTE) % MINUTES_IN_AN_HOUR),
                    seconds: Math.floor((elapsedTime / MILLISECONDS_IN_A_SECOND) % SECONDS_IN_A_MINUTE),
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
        setState(initialState);
    }

    return{
        state,
        startTimer,
        resetTimer
    }
}

export default useTimer