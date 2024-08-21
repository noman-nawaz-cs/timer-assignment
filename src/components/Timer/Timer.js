import React from "react";
import Button from "../Button/Button";
import classes from './Timer.module.css';
import useTimer from "./hooks/useTimer";

const Timer = ()=> {
    const {state, startTimer, resetTimer} = useTimer();
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
                <Button click = {startTimer} btnText={state.startButtonText}></Button>
                <Button click = {resetTimer} btnText="Reset"></Button>
            </div>  
        </div>
    )
}

export default Timer;