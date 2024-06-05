import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function CreateLobby() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [maxUsers, setMaxUsers] = useState(5);
  const [lobby, setLobby] = useState(null);

  const handleCreateLobby = async () => {
    if (!session || !session.user) return;
    const response = await axios.post('/api/lobby/create', {
      name,
      creatorId: session.user.id,
      maxUsers
    });
    setLobby(response.data);
  };

  if (!session) return <Layout><div>Please sign in to create a lobby.</div></Layout>;

  return (
    <Layout>
      <h1>Create a Lobby</h1>
      {lobby ? (
        <div>
          <h2>Lobby Created</h2>
          <p>Name: {lobby.name}</p>
          <p>Code: {lobby.code}</p>
        </div>
      ) : (
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
          <label>
            Max Users:
            <input type="number" value={maxUsers} onChange={e => setMaxUsers(e.target.value)} />
          </label>
          <button onClick={handleCreateLobby}>Create Lobby</button>
        </div>
      )}
    </Layout>
  );
}
