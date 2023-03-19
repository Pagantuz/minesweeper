import React from 'react';
import styles from './styles.module.css';

type FormContainerProps = {
  children: React.ReactNode;
};

const FormContainer: React.FC<FormContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export { FormContainer };
