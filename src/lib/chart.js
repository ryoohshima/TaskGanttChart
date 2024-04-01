/**
 * Chart.jsのオプションを作成する関数
 * @function createChartOptions
 * @param {object} data - チャートに表示するデータ
 * @returns {object} Chart.jsのオプション
 */
const createChartOptions = (data) => {
  // チャートに表示するデータを作成
  const chartData = data.map((row) => {
    const title = row.title.length > 30 ? `${row.title.slice(0, 30)}...` : row.title;
    return {
      x: [row.startDate, row.endDate],
      y: title,
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
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
        barPercentage: 0.4,
        borderSkipped: false,
        borderRadius: 5,
      }],
    },
    options: {
      indexAxis: 'y',
      title: {
        position: 'top',
      },
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
        zoom: { // ズーム
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'x',
          },
        },
      },
    },
  };
}

export default createChartOptions;