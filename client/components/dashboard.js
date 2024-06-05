import axios from 'axios';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/api/twitch/details');
      setData(result.data);
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Followers: {data.followers.total}</p>
      <p>Total Subscriptions: {data.subscriptions.total}</p>
      <p>Total Bits: {data.bits.total}</p>
    </div>
  );
};

export default Dashboard;
