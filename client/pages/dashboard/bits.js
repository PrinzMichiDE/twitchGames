import { useSession, signIn } from 'next-auth/react';
import DashboardLayout from '../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Bits() {
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
          <h1>Bits</h1>
          {data && (
            <div>
              <p><strong>Total Bits:</strong> {data.bits.total}</p>
              <ul>
                {data.bits.data.map((bit, index) => (
                  <li key={index}>
                    <p><strong>User:</strong> {bit.user_name}</p>
                    <p><strong>Bits:</strong> {bit.score}</p>
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
