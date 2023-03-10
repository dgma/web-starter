import type { FC } from 'react';
import { DemoSetup } from '@/libs/ui/DemoSetup';
import { DemoVault } from '@/libs/ui/DemoVault';
import { Account } from '@/libs/ui/Account';
import styles from './Demo.module.css'

interface DemoProps {}


const Demo: FC<DemoProps> = () => {

  return (
    <div className={styles.root}>
      <Account />
      <DemoSetup />
      <DemoVault />
    </div>
  )
}

export default Demo;