import Image from 'next/image';
import React from 'react';
import config from '../lib/config';
import styles from '../styles/Components.module.css';

export default function SocialAccounts() {
  return (
    <div className={styles.social}>
      <a
        title="Twitter"
        href={`https://twitter.com/${config.twitter_account}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src="/twitter.svg" alt="Twitter Logo" width={24} height={24} />
      </a>
      <a title="GitHub" href={`https://github.com/${config.github_account}`} target="_blank" rel="noopener noreferrer">
        <Image src="/github.svg" alt="GitHub Logo" width={24} height={24} />
      </a>
    </div>
  );
}
