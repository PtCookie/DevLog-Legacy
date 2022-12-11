import DefaultLayout from '../layout/DefaultLayout';
import { SocialAccounts } from '../components/SocialAccounts';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <DefaultLayout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta />
      <div className={styles.container}>
        <div>
          <h1>
            Hello, This is PtCookie.DevLog<span className={styles.fancy}>.</span>
          </h1>
          <span className={styles.handle}>@PtCookie</span>
          <h2>A DevLog of PtCookie</h2>
          <SocialAccounts />
        </div>
      </div>
    </DefaultLayout>
  );
}
