import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'


export function Countdown() {
    const { minutes, seconds, hasFinished, active, StartCountDown, ResetCountDown } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] =String(minutes).padStart(2, '0').split('')
    const [secondsLeft, secondsRight] =String(seconds).padStart(2, '0').split('')
    
  
   
    return (
        <div>
        <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondsLeft}</span>
                <span>{secondsRight}</span>
            </div>
            </div>
            { hasFinished ? (
                <button 
                disabled
                className={styles.startCountdown}

                >Ciclo encerrado</button>
            ) : (
                <>
                { active ?
        <button type="button" className={`${styles.startCountdown} ${styles.startCountdownActive}`} onClick={ResetCountDown} >Abandonar ciclo</button>
                 :
        <button type="button" className={styles.startCountdown} onClick={StartCountDown} >Iniciar um ciclo</button>
                }
                </>
            )}

       
        
        </div>
    );
}