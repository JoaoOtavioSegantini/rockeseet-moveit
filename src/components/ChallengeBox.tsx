import { useContext } from 'react';
import { challengesContexts } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenges } = useContext(challengesContexts);
    const { ResetCountDown} = useContext(CountdownContext)

    function handlerChallengeSucceded() {
        completeChallenges();
        ResetCountDown();
    }

    function handlerChallengeFailed() {
        resetChallenge();
        ResetCountDown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeBoxisActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Body"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                        onClick={handlerChallengeFailed} 
                        type="button"
                        className={styles.challengeFailedButton}
                        >Falhei</button>
                        <button 
                        onClick={handlerChallengeSucceded}
                        type="button"
                        className={styles.challengeSuccedButton}
                        >Completei</button>
                    </footer>
                </div>
            ) : (
            <div className={styles.challengeBoxisNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p><img src="icons/level-up.svg" alt="Level up"/>Avance de level completando desafios.</p>
            </div>
            )}
            

        </div>
    );
}