import { render, screen, fireEvent } from '@testing-library/react';
import CreateLobby from '../pages/create-lobby';
import JoinLobby from '../pages/join-lobby';
import axios from 'axios';

jest.mock('axios');

describe('Lobby Pages', () => {
  it('creates a lobby', async () => {
    const mockLobby = { name: 'TestLobby', code: 'abcdef' };
    axios.post.mockResolvedValueOnce({ data: mockLobby });

    render(<CreateLobby />);

    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'TestLobby' } });
    fireEvent.change(screen.getByLabelText('Max Users:'), { target: { value: 5 } });
    fireEvent.click(screen.getByText('Create Lobby'));

    expect(await screen.findByText('Lobby Created')).toBeInTheDocument();
    expect(screen.getByText('Name: TestLobby')).toBeInTheDocument();
    expect(screen.getByText('Code: abcdef')).toBeInTheDocument();
  });

  it('joins a lobby', async () => {
    const mockLobby = { name: 'TestLobby', users: [{ displayName: 'TestUser' }] };
    axios.post.mockResolvedValueOnce({ data: mockLobby });

    render(<JoinLobby />);

    fireEvent.change(screen.getByLabelText('Code:'), { target: { value: 'abcdef' } });
    fireEvent.click(screen.getByText('Join Lobby'));

    expect(await screen.findByText('Lobby Joined')).toBeInTheDocument();
    expect(screen.getByText('Name: TestLobby')).toBeInTheDocument();
    expect(screen.getByText('Users: TestUser')).toBeInTheDocument();
  });
});
