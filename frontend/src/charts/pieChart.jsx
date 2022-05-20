import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const pieChart = () => {
    const data ={
      
        datasets: [
            {
              label: '# of Votes',
              data: [2, 9, 3],
              backgroundColor: [
                'rgba(96, 186, 237,.2)',
                'rgba(96, 186, 237,.6)',
                'rgba(184, 50, 162,1)',
              ],
              borderColor: [
                'rgba(96, 186, 237,1)',
                'rgba(96, 186, 237,1)',
                'rgba(184, 50, 162,1)',
              ],
              borderWidth: 1,
            },
          ],
    }
  return (
    <div><Doughnut data={data} /></div>
  )
}

export default pieChart

