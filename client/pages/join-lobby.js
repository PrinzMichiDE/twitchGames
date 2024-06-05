import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function JoinLobby() {
  const { data: session } = useSession();
  const [code, setCode] = useState('');
  const [lobby, setLobby] = useState(null);

  const handleJoinLobby = async () => {
    if (!session || !session.user) return;
    const response = await axios.post('/api/lobby/join', {
      userId: session.user.id,
      code
    });
    setLobby(response.data);
  };

  if (!session) return <Layout><div>Please sign in to join a lobby.</div></Layout>;

  return (
    <Layout>
      <h1>Join a Lobby</h1>
      {lobby ? (
        <div>
          <h2>Lobby Joined</h2>
          <p>Name: {lobby.name}</p>
          <p>Users: {lobby.users.map(user => user.displayName).join(', ')}</p>
        </div>
      ) : (
        <div>
          <label>
            Code:
            <input type="text" value={code} onChange={e => setCode(e.target.value)} />
          </label>
          <button onClick={handleJoinLobby}>Join Lobby</button>
        </div>
      )}
    </Layout>
  );
}
