'use client';

import dynamic from 'next/dynamic';

const CosmosBackground = dynamic(() => import('@/components/CosmosBackground'), { ssr: false });

export default function ClientCosmosBackground() {
  return <CosmosBackground />;
}
