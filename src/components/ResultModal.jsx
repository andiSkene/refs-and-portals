import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({targetTime,remainingTime,onReset}, ref) {
    const dialog = useRef();//decouple this ref from the outside ref

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime/1000).toFixed(2);
    const score = Math.round((1 - remainingTime/(targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            } //we're exposing the open method
        };
    });

    return createPortal(<dialog ref={dialog} className="result-modal" onClose={onReset}>
        {userLost && <h2>You lost.</h2>};
        {!userLost && <h2>Your score:{score}</h2>};
        <p>The target time was <strong>{targetTime} seconds</strong></p>
        <p>You stopped the timer with <strong>{formattedRemainingTime} second left.</strong></p>
        <form method="dialog">
            <button onClick={onReset}>Close</button>
        </form>
    </dialog>,
    document.getElementById('modal')
    );
})

export default ResultModal;