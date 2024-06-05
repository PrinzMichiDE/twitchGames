import { useSession, signIn } from 'next-auth/react';
import DashboardLayout from '../../components/DashboardLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Channel() {
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
          <h1>Channel Information</h1>
          {data && (
            <div>
              <p><strong>Title:</strong> {data.channel.data[0].title}</p>
              <p><strong>Game:</strong> {data.channel.data[0].game_name}</p>
              <p><strong>Language:</strong> {data.channel.data[0].broadcaster_language}</p>
              <p><strong>Tags:</strong> {data.channel.data[0].tags.join(', ')}</p>
              <p><strong>Is Branded Content:</strong> {data.channel.data[0].is_branded_content ? 'Yes' : 'No'}</p>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
