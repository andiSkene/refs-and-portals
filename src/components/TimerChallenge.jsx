import { useState, useRef } from 'react';
import ResultModal from './ResultModal.jsx';

export default function TimerChallenge({ title, targetTime }) {
    const dialog = useRef();
    const timer = useRef();

    const [ timeRemaining, setTimeRemaining ] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function startHandler() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevtimeRemaining => prevtimeRemaining - 10);
        }, 10); // built into javascript, not react specific
    }

    function stopHandler() {
        clearInterval(timer.current);
        dialog.current.open();
    }

    function resetHandler() {
        setTimeRemaining(targetTime * 1000);
    }

    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={resetHandler} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <button onClick={timerIsActive ? stopHandler : startHandler}>
                    {timerIsActive ? 'Stop' : 'Start'} Challenge
                </button>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is running..." : "Timer inactive"}
                </p>
            </section>
        </>
    );
};