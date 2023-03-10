import { useState } from 'react';
import type { FC } from 'react';
import Typewriter from 'typewriter-effect';

import WelcomeButton from './WelcomeButton';

import styles from './Welcome.module.css';

const Welcome: FC = () => {
  const [isWelcomeButtonShowed, setIsWelcomeButtonShowed] = useState(false);

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        <Typewriter
          onInit={(typewriter) => {
            typewriter.typeString('Welcome to Dogma')
              .callFunction(() => {
                setIsWelcomeButtonShowed(true);
              })
              .start();
          }}
          options={{
            delay: 85
          }}
        />
      </h1>
      {isWelcomeButtonShowed && <WelcomeButton />}
    </div>
  )
}

export default Welcome