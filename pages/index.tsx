import { useRouter } from 'next/router';
import DefaultLayout from '@/components/layout/DefaultLayout';
import SocialAccounts from '@/components/SocialAccounts';
import BasicMeta from '@/components/meta/BasicMeta';
import OpenGraphMeta from '@/components/meta/OpenGraphMeta';
import TwitterCardMeta from '@/components/meta/TwitterCardMeta';

export default function Home() {
  const { locale } = useRouter();

  return (
    <DefaultLayout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta />
      <div className={'container'}>
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
            PtCookie<span className={'fancy'}>.</span>DevLog
            {locale === 'ko' ? (
              <>
                <br />
                입니다
              </>
            ) : (
              <></>
            )}
          </h1>
          <span className={'handle'}>@PtCookie</span>
          <h2>A DevLog of PtCookie</h2>
          <SocialAccounts />
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 0 1.5rem;
          height: 80vh;
          display: flex;
          flex: 1 1 auto;
          justify-content: center;
          align-items: center;

          & h1 {
            margin: 0;
            font-size: 2.5rem;
            font-weight: 500;

            & br {
              display: initial;

              @media (width >= 769px) {
                display: none;
              }
            }

            @media (width >= 769px) {
              font-size: 3rem;
            }
          }

          & h2 {
            margin-top: 4rem;
            font-size: 1.75rem;
            font-weight: 400;
            line-height: 1.25;

            @media (width >= 769px) {
              margin-top: 2rem;
              font-size: 2.25rem;
            }
          }
        }

        .fancy {
          color: var(--point);
        }

        .handle {
          margin-top: 0.275em;
          display: inline-block;
          color: var(--light-gray);
          letter-spacing: 0.05em;
        }
      `}</style>
    </DefaultLayout>
  );
}
