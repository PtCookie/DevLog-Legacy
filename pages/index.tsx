import { useRouter } from 'next/router';
import DefaultLayout from '../components/layout/DefaultLayout';
import SocialAccounts from '../components/SocialAccounts';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { locale } = useRouter();

  return (
    <DefaultLayout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta />
      <div className={styles.container}>
        <div>
          <h1>
            {locale === 'ko' ? (
              <>
                안녕하세요,&nbsp;
                <br />
              </>
            ) : (
              <>
                Hello,&nbsp;
                <br />
              </>
            )}
            {locale === 'ko' ? (
              <></>
            ) : (
              <>
                This is&nbsp;
                <br />
              </>
            )}
            PtCookie<span className={styles.fancy}>.</span>DevLog
            {locale === 'ko' ? (
              <>
                <br />
                입니다
              </>
            ) : (
              <></>
            )}
          </h1>
          <span className={styles.handle}>@PtCookie</span>
          <h2>A DevLog of PtCookie</h2>
          <SocialAccounts />
        </div>
      </div>
    </DefaultLayout>
  );
}
