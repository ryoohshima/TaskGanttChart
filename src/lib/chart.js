/**
 * Chart.jsのオプションを作成する関数
 * @function createChartOptions
 * @param {object} data - チャートに表示するデータ
 * @returns {object} Chart.jsのオプション
 */
const createChartOptions = (data) => {
  // チャートに表示するデータを作成
  const chartData = data.map((row) => {
    return {
      x: [row.startDate, row.endDate],
      y: row.title,
    };
  });

  // 最小の日付と最大の日付を取得
  const minDate = new Date(Math.min.apply(null, data.map((row) => new Date(row.startDate))));
  const setMinDate = `${minDate.getFullYear()}-${(minDate.getMonth() + 1).toString().padStart(2, '0')}-01`
  const maxDate = new Date(Math.max.apply(null, data.map((row) => new Date(row.endDate))));
  const setMaxDate = `${maxDate.getFullYear()}-${(maxDate.getMonth() + 1).toString().padStart(2, '0')}-${new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0).getDate()}`;

  return {
    type: 'bar',
    data: {
      datasets: [{
        data: chartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
        barPercentage: 0.4,
        borderSkipped: false,
        borderRadius: 5,
      }],
    },
    options: {
      indexAxis: 'y',
      layout: {
        padding: {
          left: 10,
          bottom: 20
        }
      },
      scales: {
        x: {
          type: 'time',
          time: {
            parser: 'yyyy-MM-dd',
            unit: 'day',
            displayFormats: {
              day: 'yyyy-MM-dd',
            },
          },
          min: setMinDate,
          max: setMaxDate,
        },
      },
      plugins: {
        legend: { // 凡例
          display: false,
        },
      },
    },
  };
}

export default createChartOptions;