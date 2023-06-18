import { generateBaseMetadata } from '@/components/meta/generateBaseMetadata';
import Home from './client';

import type { Metadata } from 'next';

export default function HomePage() {
  return <Home />;
}

export async function generateMetadata(): Promise<Metadata> {
  return generateBaseMetadata({ url: '/' });
}
