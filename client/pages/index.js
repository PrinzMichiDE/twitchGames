import { useSession, signIn } from 'next-auth/react';
import Layout from '../components/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const { data: session } = useSession();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (session) {
      axios.get('/api/twitch/analytics')
        .then(response => {
          setAnalytics(response.data);
        })
        .catch(error => {
          console.error('Error fetching analytics:', error);
        });
    }
  }, [session]);

  return (
    <Layout>
      {!session ? (
        <div>
          <h1>Welcome to the Interactive Twitch Platform</h1>
          <button onClick={() => signIn('twitch')}>Sign in with Twitch</button>
        </div>
      ) : (
        <div>
          <h1>Welcome back, {session.user.name}!</h1>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            <img src={session.user.image} alt="Profile" style={{ borderRadius: '50%', marginRight: '20px' }} />
            <div>
              <p><strong>Name:</strong> {session.user.name}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
            </div>
          </div>
          {analytics && (
            <div>
              <h2>Analytics</h2>
              <pre>{JSON.stringify(analytics, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}
