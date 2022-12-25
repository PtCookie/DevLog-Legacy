import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

type ThemeContextType = [boolean, Dispatch<SetStateAction<boolean>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new ReferenceError('theme context is not exists');
  return context;
}

export function ThemeProvider({ children }: Props) {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return <ThemeContext.Provider value={[darkMode, setDarkMode]}>{children}</ThemeContext.Provider>;
}
