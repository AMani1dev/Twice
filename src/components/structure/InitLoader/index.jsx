import { Suspense } from 'react';
import styles from './index.module.css';

const InitLoader = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className={`${styles.loader} position-absolute uts-middle`}></div>
      }
    >
      {children}
    </Suspense>
  );
};

export default InitLoader;
