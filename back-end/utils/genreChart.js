const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const ChartDataLabels = require('chartjs-plugin-datalabels'); 

const generatePieChart = async (genreScore) => {
  const width = 400;
  const height = 400;
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, plugins: [ChartDataLabels] }); 

  const userRequestLabels = Object.keys(genreScore.genreCounts);
  const userRequestData = Object.values(genreScore.genrePercentages);

  const chartConfig = {
    type: 'pie',
    data: {
      labels: userRequestLabels,
      datasets: [{
        label: 'User Request Genre Scores',
        data: userRequestData,
        backgroundColor: [
            '#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff5733', 
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
            '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
            '#ffbf00', '#ff6600', '#ff00ff', '#00ffcc', '#9900cc'
          ], 
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        datalabels: {
          color: '#ffffff',
          font: { weight: 'bold', size: 14 },
          formatter: (value) => `${Math.round(value)}%`, // Menampilkan persentase
          anchor: 'center',
          align: 'center',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}%`;
            }
          }
        }
      }
    }
  };

  const imageBuffer = await chartJSNodeCanvas.renderToBuffer(chartConfig);
  const randomFileName = crypto.randomBytes(16).toString('hex'); 
  const imagePath = path.join(__dirname, `../assets/${randomFileName}.png`);
  
  fs.writeFileSync(imagePath, imageBuffer);

  return imagePath;
};

module.exports = { generatePieChart };
