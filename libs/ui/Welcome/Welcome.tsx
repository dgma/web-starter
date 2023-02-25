import type { FC } from 'react';
import { useState } from 'react';
import { Nav } from '@/libs/ui/Nav';
import Typewriter from 'typewriter-effect';
import styles from './Welcome.module.css';

const links = [
  {
    href: 'https://drive.google.com/file/d/1ofUZO3uDC88Z8cfzmt1MdgTd6U_OSeXK/view?usp=share_link',
    name: 'Lite Paper'
  },
  {
    name: 'Executive Summary'
  },
  {
    href: '/demo',
    name: 'Demo App'
  },
]

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
      <Nav isShowed={isWelcomeMessageShowed} links={links}/>
    </div>
  )
}

export default Welcome