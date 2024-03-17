import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const GanttChart = ({ ganttRows }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartContext = chartRef.current.getContext('2d');
      new Chart(chartContext, {
        type: 'bar', // 例として棒グラフ
        data: {
          // データセット
          datasets: [
            {
              backgroundColor: [
                // ここを増やしていけばバーの色のバリエーションが増えます。
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                // ここを増やしていけばバーの色のバリエーションが増えます。
                'rgb(255, 99, 132)',
              ],
              borderWidth: 1,
              barPercentage: 0.4,
              borderSkipped: false,
              borderRadius: 5,
              data: [
                {
                  x: ['2023-02-01', '2023-06-01'],
                  z: 'hoverしたときに出てくる文字を入力',
                },
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          layout: {
            padding: {
              left: 10,
              bottom: 20,
            },
          },
        },
      });
    }
  }, []);

  return <canvas ref={chartRef} />;
};

export default GanttChart;
