import { useContext } from 'react';
import { challengesContexts } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const {level} = useContext(challengesContexts)
    return (
        <div className={styles.profileContainer}>
            <img src="https://instagram.fqps3-1.fna.fbcdn.net/v/t51.2885-19/s150x150/19765186_322540714834476_7736698807043227648_a.jpg?_nc_ht=instagram.fqps3-1.fna.fbcdn.net&_nc_ohc=N4qevPXRZxIAX-syKsc&tp=1&oh=81b247fac3ff4d9e29d279e318198d96&oe=605FD0DC" alt=""/>
            <div>
                <strong>João Otávio</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                    </p>
                </div>
        </div>
    );
}