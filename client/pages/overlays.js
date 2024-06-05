import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Overlays() {
  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    axios.get('/api/overlay')
      .then(response => setOverlays(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Overlay Store</h1>
      <ul>
        {overlays.map(overlay => (
          <li key={overlay._id}>
            <h2>{overlay.name}</h2>
            <p>Created by: {overlay.creator.displayName}</p>
            <p>Components: {JSON.stringify(overlay.components)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
