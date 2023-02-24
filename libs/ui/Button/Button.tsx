import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

import styles from './Button.module.css';

const Button: FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
  return <button {...props} className={`${styles.root} ${props.className}`} />;
}

export default Button;
