import { Line } from 'react-chartjs-2'

import { BLUE_TEAM, RED_TEAM } from '@utils/constants'

type GoldDifferenceProps = {
  blueGold: number[]
  redGold: number[]
}

function GoldDifference(props: GoldDifferenceProps): JSX.Element {
  const { blueGold, redGold } = props

  const data = {
    labels: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00'],
    datasets: [
      {
        label: BLUE_TEAM,
        type: 'line',
        data: blueGold,
        fill: false,
        backgroundColor: 'white',
        borderColor: '#5580ed',
      },
      {
        label: RED_TEAM,
        type: 'line',
        data: redGold,
        fill: false,
        backgroundColor: 'white',
        borderColor: '#ed5565',
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            max: 21000,
            min: 0,
            stepSize: 3000,
          },
        },
      ],
    },
    legend: {
      display: false,
    },
  }

  return <Line data={data} options={options} />
}

export default GoldDifference
