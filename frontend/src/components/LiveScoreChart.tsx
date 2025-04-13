// components/LiveScoreChart.tsx
'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Tick } from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const generateLabels = () => Array.from({ length: 49 }, (_, i) => i); // 0–48 mins

export default function LiveScoreChart() {
  const [teamAScores, setTeamAScores] = useState<number[]>([]);
  const [teamBScores, setTeamBScores] = useState<number[]>([]);
  const [labels, setLabels] = useState<number[]>([]);

  // Simulate real-time update every second
  useEffect(() => {
    const interval = setInterval(() => {
      const nextMinute = labels.length;
      if (nextMinute > 48) return;

      setLabels((prev) => [...prev, nextMinute]);
      setTeamAScores((prev) => [...prev, (prev.at(-1) ?? 0) + Math.floor(Math.random() * 4)]);
      setTeamBScores((prev) => [...prev, (prev.at(-1) ?? 0) + Math.floor(Math.random() * 4)]);
;
    }, 1000);

    return () => clearInterval(interval);
  }, [labels]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Team A',
        data: teamAScores,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Team B',
        data: teamBScores,
        borderColor: 'red',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Live NBA Score (By Minute)',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Minute',
        },
        ticks: {
            callback: (
              tickValue: string | number,
              index: number,
              ticks: Tick[]
            ): string => {
              const val = typeof tickValue === 'number' ? tickValue : parseInt(tickValue, 10);
              return val % 12 === 0 ? `Q${val / 12 + 1}` : `${val}`;
            }
        },
        grid: {
          color: (context: any) => (context.tick.value % 12 === 0 ? '#999' : '#ddd'),
          lineWidth: (context: any) => {
            const value = context?.tick?.value;
            return typeof value === 'number' && value % 12 === 0 ? 2 : 1;
          }
        },
      },
      y: {
        title: {
          display: true,
          text: 'Score',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}
