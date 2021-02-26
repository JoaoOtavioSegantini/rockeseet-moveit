import { useContext } from 'react';
import { challengesContexts } from '../contexts/ChallengeContext';
import styles from  '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {

    const { challengesComplete } = useContext(challengesContexts);

    return (
        <div className={styles.completedChallengesContainer}>
            <span>Desafios Completos</span>
                <span>{challengesComplete}</span>
        </div>
    );
}