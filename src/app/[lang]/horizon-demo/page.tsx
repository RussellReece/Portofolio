'use client';

import dynamic from 'next/dynamic';

const HorizonHero = dynamic(
  () => import('@/components/ui/horizon-hero-section').then((mod) => ({ default: mod.Component })),
  { ssr: false }
);

export default function HorizonDemoLangPage() {
  return <HorizonHero />;
}
