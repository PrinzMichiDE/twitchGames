import { useSession, signIn } from 'next-auth/react';
import DashboardLayout from '../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
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
          <h1>User Profile</h1>
          {data && (
            <div>
              <h2>User Information</h2>
              <p><strong>Name:</strong> {data.user.data[0].display_name}</p>
              <p><strong>Email:</strong> {session.user.email}</p>
              <p><strong>Broadcaster Type:</strong> {data.user.data[0].broadcaster_type}</p>
              <p><strong>View Count:</strong> {data.user.data[0].view_count}</p>
              <p><strong>Description:</strong> {data.user.data[0].description}</p>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
