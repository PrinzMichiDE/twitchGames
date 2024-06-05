import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('/api/game')
      .then(response => setGames(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Game Store</h1>
      <ul>
        {games.map(game => (
          <li key={game._id}>
            <h2>{game.name}</h2>
            <p>Created by: {game.creator.displayName}</p>
            <p>Settings: {JSON.stringify(game.settings)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
