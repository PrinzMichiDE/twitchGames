import { render, screen } from '@testing-library/react';
import Overlays from '../pages/overlays';
import axios from 'axios';

jest.mock('axios');

describe('Overlays Page', () => {
  it('displays a list of overlays', async () => {
    const mockOverlays = [
      { _id: '1', name: 'Overlay1', creator: { displayName: 'User1' }, components: [{ type: 'video', url: 'http://example.com/video1.mp4' }] },
      { _id: '2', name: 'Overlay2', creator: { displayName: 'User2' }, components: [{ type: 'video', url: 'http://example.com/video2.mp4' }] }
    ];

    axios.get.mockResolvedValueOnce({ data: mockOverlays });

    render(<Overlays />);

    expect(await screen.findByText('Overlay1')).toBeInTheDocument();
    expect(screen.getByText('Created by: User1')).toBeInTheDocument();
    expect(screen.getByText('Overlay2')).toBeInTheDocument();
    expect(screen.getByText('Created by: User2')).toBeInTheDocument();
  });
});
