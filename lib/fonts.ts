import localFont from '@next/font/local';
import { Noto_Serif_KR, JetBrains_Mono } from '@next/font/google';

const sansSerif = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
});

const serif = Noto_Serif_KR({
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  subsets: ['korean', 'latin'],
  variable: '--serif-font',
});

const monospace = JetBrains_Mono({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--monospace-font',
});

export { sansSerif, serif, monospace };
