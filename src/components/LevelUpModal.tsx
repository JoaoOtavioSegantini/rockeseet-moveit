import { useContext } from 'react';
import { challengesContexts } from '../contexts/ChallengeContext';
import styles from '../styles/components/LevelUpModal.module.css'


export function LevelUpModal() {
    const { level, CloseLevelUpModal } = useContext(challengesContexts)
    return (
        <div className={styles.overlay}>
        <div className={styles.container}>
            <header>{level}</header>
            <strong>Parabéns</strong>
            <p>Você alcançou um novo level!</p>

            <button 
            type="button"
            onClick={CloseLevelUpModal}
            >
                <img src="/icons/close.svg" alt="close"/>
            </button>

        </div>
        </div>
    );
}