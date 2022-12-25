import React from 'react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
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
        <BsTwitter size={'24px'} />
      </a>
      <a title="GitHub" href={`https://github.com/${config.github_account}`} target="_blank" rel="noopener noreferrer">
        <BsGithub size={'24px'} />
      </a>
    </div>
  );
}
