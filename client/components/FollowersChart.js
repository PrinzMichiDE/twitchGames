// components/FollowersChart.js
import { Bar } from 'react-chartjs-2';

const FollowersChart = ({ followersData }) => {
  const data = {
    labels: ['Followers'],
    datasets: [
      {
        label: 'Total Followers',
        data: [followersData.total],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default FollowersChart;
