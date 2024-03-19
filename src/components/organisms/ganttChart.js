import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const GanttChart = ({ chartOptions }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const chartContext = chartRef.current.getContext('2d');
      new Chart(chartContext, chartOptions);
    }
  }, []);

  return <canvas ref={chartRef} />;
};

export default GanttChart;
