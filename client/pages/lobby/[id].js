import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

export default function LobbyDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [lobby, setLobby] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/lobby/${id}`)
        .then(response => setLobby(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  if (!lobby) return <div>Loading...</div>;

  return (
    <Layout>
      <h1>{lobby.name}</h1>
      <h2>Creator: {lobby.creator.displayName}</h2>
      <h3>Users:</h3>
      <ul>
        {lobby.users.map(user => (
          <li key={user._id}>{user.displayName}</li>
        ))}
      </ul>
    </Layout>
  );
}
