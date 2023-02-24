import type { FC } from 'react';
import Link from 'next/link'
import styles from './Nav.module.css';

interface NavProps {
  isShowed: boolean
}

const Nav: FC<NavProps> = ({ isShowed }) => {
  const navClassName = isShowed ? `${styles.nav} ${styles.navShowed}` : `${styles.nav} ${styles.navHidden}`;

  return (
    <div className={navClassName}>
      <Link href="https://drive.google.com/file/d/1ofUZO3uDC88Z8cfzmt1MdgTd6U_OSeXK/view?usp=share_link" className={styles.hoverUnderlineAnimation} target="_blank">Dogma Lite Paper</Link>
      <Link href="" className={styles.hoverUnderlineAnimation}>Executive Summary</Link>
      <Link href="/demo" className={styles.hoverUnderlineAnimation}>Demo</Link>
    </div>
  )
}

export default Nav;