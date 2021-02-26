import { createContext, useState, ReactNode, useEffect  } from 'react';
import challenges from '../../challenges.json'


interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    LevelUp: () => void ;
    level: number;
    currentExperience: number;
    challengesComplete: number;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel: number;
    completeChallenges: () => void;
}
export const challengesContexts = createContext({} as ChallengesContextData );
interface ChallengesProviderProps {
    children: ReactNode;
}
export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesComplete, setChallengesComplete] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function LevelUp() {
       setLevel(level + 1)
    }

    function startNewChallenge() {
       const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
       const challenge = challenges[randomChallengesIndex];
       setActiveChallenge(challenge);

       new Audio('/notification.mp3').play();
       

       if (Notification.permission === 'granted') {
           new Notification('Novo desafio', {
               body: `Valendo ${challenge.amount}xp`
           })
       }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenges() {

        if(!activeChallenge) {
            return;
        }
       const { amount } = activeChallenge;
       let finalExperience = currentExperience + amount;
       if( finalExperience >= experienceToNextLevel) {
           finalExperience = finalExperience - experienceToNextLevel;
           LevelUp();
       }
       setCurrentExperience(finalExperience);
       setActiveChallenge(null);
       setChallengesComplete(challengesComplete + 1);
    }

    return (
        <challengesContexts.Provider
         value={{
             LevelUp,
             level, 
             currentExperience,
             challengesComplete,
             startNewChallenge,
             activeChallenge,
             resetChallenge,
             experienceToNextLevel,
             completeChallenges
               }}>
          {children}
         </challengesContexts.Provider>
          );
}