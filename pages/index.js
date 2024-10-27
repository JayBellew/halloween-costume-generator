import React from 'react';
import dynamic from 'next/dynamic';

const HalloweenCostumeGenerator = dynamic(
  () => import('@/components/HalloweenCostumeGenerator'),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <HalloweenCostumeGenerator />
    </main>
  );
}
