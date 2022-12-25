import { useEffect, useState } from 'react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import styles from '../styles/Components.module.css';

type Props = {
  active: boolean;
};

export default function ThemeSwitch({ active }: Props) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDark =
      localStorage.getItem('theme') !== null
        ? localStorage.getItem('theme') === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (isDark) {
      document.documentElement.dataset.theme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.dataset.theme = 'light';
      localStorage.setItem('theme', 'light');
    }

    setDarkMode(isDark);
  }, []);

  function toggleTheme() {
    if (darkMode) {
      document.documentElement.dataset.theme = 'light';
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.dataset.theme = 'dark';
      localStorage.setItem('theme', 'dark');
    }

    setDarkMode((prevState) => !prevState);
  }

  return (
    <div className={styles.theme} data-active={active} onClick={toggleTheme}>
      {darkMode ? <BsMoonFill size={'24px'} /> : <BsSunFill size={'24px'} />}
    </div>
  );
}
