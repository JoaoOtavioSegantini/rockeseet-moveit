import { createContext, useState, ReactNode, useEffect  } from 'react';
import challenges from '../../challenges.json'
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

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
    CloseLevelUpModal: () => void;
}
export const challengesContexts = createContext({} as ChallengesContextData );


interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesComplete: number;
}


export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesComplete, setChallengesComplete] = useState(rest.challengesComplete ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', level.toString());
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesComplete', challengesComplete.toString());

    }, [level, currentExperience, challengesComplete])


    function LevelUp() {
       setLevel(level + 1)
       setIsOpenModal(true)
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

    function CloseLevelUpModal() {
        setIsOpenModal(false);
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
             completeChallenges,
             CloseLevelUpModal
               }}>
          {children}
          {isOpenModal && <LevelUpModal />}
         </challengesContexts.Provider>
          );
}