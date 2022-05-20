import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
 
const lineChart = () => {

const labels = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre','Novembre','Décembre'];
const chiffre = ["1562", "4899","8567","6759","9077","7520","9860","1563", "6330", "9361", "8689", "8892"]
    const options = {
        responsive: true,
        plugins: {
          title: {
            display: false,
            text: 'Factures',
          },
        },
      };
    const data = {
        labels,

        datasets: [
            {
              label: '€',
              data: chiffre,
              borderColor: 'rgba(184, 50, 162,1)',
              backgroundColor: 'rgba(184, 50, 162,1)',
              tension: 0.4,
              fill: false,
            },
          ],
    }
  return (
    <Line options={options} data={data} />
  )
}

export default lineChart