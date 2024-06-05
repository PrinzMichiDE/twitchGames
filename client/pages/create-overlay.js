import { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout';

export default function CreateOverlay() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [components, setComponents] = useState([]);
  const [overlay, setOverlay] = useState(null);

  const handleAddComponent = () => {
    setComponents([...components, { type: '', url: '' }]);
  };

  const handleComponentChange = (index, field, value) => {
    const newComponents = components.slice();
    newComponents[index][field] = value;
    setComponents(newComponents);
  };

  const handleCreateOverlay = async () => {
    const response = await axios.post('/api/overlay/create', {
      name,
      creatorId: session.user.id,
      components
    });
    setOverlay(response.data);
  };

  if (!session) return <Layout><div>Please sign in to create an overlay.</div></Layout>;

  return (
    <Layout>
      <h1>Create an Overlay</h1>
      {overlay ? (
        <div>
          <h2>Overlay Created</h2>
          <p>Name: {overlay.name}</p>
          <p>Components: {JSON.stringify(overlay.components)}</p>
        </div>
      ) : (
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
          <button onClick={handleAddComponent}>Add Component</button>
          {components.map((component, index) => (
            <div key={index}>
              <label>
                Type:
                <input type="text" value={component.type} onChange={e => handleComponentChange(index, 'type', e.target.value)} />
              </label>
              <label>
                URL:
                <input type="text" value={component.url} onChange={e => handleComponentChange(index, 'url', e.target.value)} />
              </label>
            </div>
          ))}
          <button onClick={handleCreateOverlay}>Create Overlay</button>
        </div>
      )}
    </Layout>
  );
}
