'use client';

import dynamic from 'next/dynamic';

// Avoid SSR issues with Chart.js
const LiveScoreChart = dynamic(() => import('@/components/LiveScoreChart'), { ssr: false });

export default function LiveScoreChartWrapper() {
  return <LiveScoreChart />;
}