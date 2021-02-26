import Head from 'next/head'


import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";


import styles from '../styles/pages/Home.module.css'
import { CoundownProvider } from '../contexts/CountdownContext';


 
export default function Home() {

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | moveit</title>
      </Head>
      <ExperienceBar />
       <CoundownProvider >
      <section>
        <div>
           <Profile />
           <CompletedChallenges />
           <Countdown />
        </div>
        <div>
           <ChallengeBox />
        </div>
      </section>
      </CoundownProvider>
      </div>
  )
}
