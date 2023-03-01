import { useState } from 'react';
import { DemoSetup } from '@/libs/ui/DemoSetup';
import { DemoForm } from '@/libs/ui/DemoForm';
import { Nav } from '@/libs/ui/Nav';
import { Account } from '@/libs/ui/Account';
import styles from './Demo.module.css'

interface DemoProps {
  isConnectedToProperNetwork: boolean
}


export default function Demo({ isConnectedToProperNetwork }: DemoProps) {

  const [isTransactionPending, setTransactionPending] = useState(false);

  return (
    <div className={styles.root}>
      <Account pending={isTransactionPending} />
      <DemoSetup isConnectedToProperNetwork={isConnectedToProperNetwork} />
      <DemoForm setTransactionPending={setTransactionPending} isTransactionPending={isTransactionPending} />
    </div>
  )
}
