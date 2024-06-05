import { useSession, signIn } from 'next-auth/react';
import DashboardLayout from '../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Subscribers() {
  const { data: session } = useSession();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (session) {
      axios.get('/api/twitch/details')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [session]);

  return (
    <DashboardLayout>
      {!session ? (
        <div>
          <h1>Welcome to the Interactive Twitch Platform</h1>
          <button onClick={() => signIn('twitch')}>Sign in with Twitch</button>
        </div>
      ) : (
        <div>
          <h1>Subscribers</h1>
          {data && (
            <div>
              <p><strong>Total Subscribers:</strong> {data.subscriptions.total}</p>
              <ul>
                {data.subscriptions.data.map((sub, index) => (
                  <li key={index}>
                    <p><strong>User:</strong> {sub.user_name}</p>
                    <p><strong>Tier:</strong> {sub.tier}</p>
                    <p><strong>Subscribed At:</strong> {new Date(sub.created_at).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
