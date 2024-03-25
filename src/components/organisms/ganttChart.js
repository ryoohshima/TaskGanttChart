import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const GanttChart = ({ chartOptions }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // チャートが既に存在している場合は破棄
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    if (chartRef && chartRef.current) {
      const chartContext = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(chartContext, chartOptions);
    }
  }, [chartOptions]);

  return <canvas ref={chartRef} />;
};

export default GanttChart;
