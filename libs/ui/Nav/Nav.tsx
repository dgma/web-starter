import type { FC } from 'react';
import Link from 'next/link'
import styles from './Nav.module.css';

interface LinksConfig {
  href?: string;
  name: string;
}

interface NavProps {
  isShowed: boolean;
  links: LinksConfig[];
}

const Nav: FC<NavProps> = ({ isShowed, links }) => {
  const navClassName = isShowed ? `${styles.nav} ${styles.navShowed}` : `${styles.nav} ${styles.navHidden}`;

  return (
    <div className={navClassName}>
      {links.map(
        ({ href, name }) => (
          <Link href={href || ''} className={styles.hoverUnderlineAnimation} key={name}>
            {name}
          </Link>
        )
      )}
    </div>
  )
}

export default Nav;