import type { FC } from 'react';
import { useState } from 'react';
import { Nav } from '@/libs/ui/Nav';
import Typewriter from 'typewriter-effect';
import styles from './Welcome.module.css';

const Welcome: FC<{}> = () => {
  const [isWelcomeMessageShowed, setIsWelcomeMessageShowed] = useState(false);
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('Welcome to the Dogma Protocol')
              .callFunction(() => {
                setIsWelcomeMessageShowed(true);
              })
              .start();
          }}
        />
      </h1>
      <Nav isShowed={isWelcomeMessageShowed}/>
    </div>
  )
}

export default Welcome