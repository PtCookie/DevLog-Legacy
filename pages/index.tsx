import DefaultLayout from '../layout/DefaultLayout';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div>
          <h1>
            Hello, This is PtCookie.DevLog<span className={styles.fancy}>.</span>
          </h1>
          <span className={styles.handle}>@PtCookie</span>
          <h2>A DevLog of PtCookie</h2>
        </div>
      </div>
    </DefaultLayout>
  );
}
