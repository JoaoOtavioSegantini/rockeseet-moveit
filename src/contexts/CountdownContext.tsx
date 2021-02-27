import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { challengesContexts } from "./ChallengeContext";

interface countDownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    active: boolean;
    StartCountDown: () => void;
    ResetCountDown: () => void;
    
}

interface CountDownProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as countDownContextData);

let countDownTimeOut: NodeJS.Timeout;

export function CoundownProvider({ children } : CountDownProps) {
 
    const { startNewChallenge } = useContext(challengesContexts)

    const [time, setTime] = useState(25*60)
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const [active, setActive] = useState(false);
    const [hasFinished, setHasFinihed] = useState(false)

    function StartCountDown() {
        setActive(true)

    }

    function ResetCountDown() {
        clearTimeout(countDownTimeOut);
        setActive(false);
        setHasFinihed(false);
        setTime(25*60);
    }
    useEffect(() => {
        if(active && time > 0){
            countDownTimeOut = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (active && time === 0) {
            setActive(false);
            setHasFinihed(true);
            startNewChallenge();
        }
      
    }, [active, time])



    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            active,
            StartCountDown,
            ResetCountDown,

        }}>
               {children}
        </CountdownContext.Provider>
    );
}