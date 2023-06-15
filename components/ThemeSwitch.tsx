import { BsSunFill, BsMoonFill } from 'react-icons/bs';
import { useThemeContext } from '@/components/context/ThemeProvider';

import styles from './ThemeSwitch.module.css';

type Props = {
  active: boolean;
};

export default function ThemeSwitch({ active }: Props) {
  const [darkMode, setDarkMode] = useThemeContext();

  function toggleTheme() {
    if (darkMode) {
      document.documentElement.dataset.theme = 'light';
    } else {
      document.documentElement.dataset.theme = 'dark';
    }

    setDarkMode((prevState) => !prevState);
  }

  return (
    <div className={styles.theme} data-active={active} onClick={toggleTheme}>
      {darkMode ? <BsMoonFill size={'24px'} /> : <BsSunFill size={'24px'} />}
    </div>
  );
}
