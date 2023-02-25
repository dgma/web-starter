import { useState } from 'react';
import { DemoSetup } from '@/libs/ui/DemoSetup';
import { DemoForm } from '@/libs/ui/DemoForm';
import { Nav } from '@/libs/ui/Nav';
import { Account } from '@/libs/ui/Account';
import styles from './Demo.module.css'

const links = [
  {
    href: 'https://drive.google.com/file/d/1ofUZO3uDC88Z8cfzmt1MdgTd6U_OSeXK/view?usp=share_link',
    name: 'Lite Paper'
  },
  {
    name: 'Executive Summary'
  },
  {
    href: '/',
    name: 'Home'
  },
];


export default function Demo() {

  const [isTransactionPending, setTransactionPending] = useState(false);

  return (
    <div className={styles.root}>
      <Account pending={isTransactionPending} />
      <DemoSetup />
      <DemoForm setTransactionPending={setTransactionPending} isTransactionPending={isTransactionPending} />
      <Nav isShowed links={links}/>
    </div>
  )
}
