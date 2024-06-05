import React, { useEffect, useState } from 'react';
import ChartComponent from '../../components/Chart';
import axios from 'axios';

const Followers = () => {
  const [data, setData] = useState({ labels: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/getFollowersData');
      const followersData = response.data;
      const labels = followersData.map(item => item.date);
      const values = followersData.map(item => item.count);
      setData({ labels, values });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Followers</h1>
      <ChartComponent data={data} />
    </div>
  );
};

export default Followers;
