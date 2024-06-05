import { render, screen } from '@testing-library/react';
import LobbyDetails from '../pages/lobby/[id]';
import axios from 'axios';
import { useRouter } from 'next/router';

jest.mock('axios');
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

describe('Lobby Details Page', () => {
  it('displays lobby details', async () => {
    const mockLobby = {
      name: 'TestLobby',
      creator: { displayName: 'CreatorUser' },
      users: [{ _id: '1', displayName: 'User1' }, { _id: '2', displayName: 'User2' }]
    };

    axios.get.mockResolvedValueOnce({ data: mockLobby });
    useRouter.mockReturnValue({ query: { id: '123' } });

    render(<LobbyDetails />);

    expect(await screen.findByText('TestLobby')).toBeInTheDocument();
    expect(screen.getByText('Creator: CreatorUser')).toBeInTheDocument();
    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
  });
});
