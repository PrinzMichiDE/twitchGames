import { render, screen } from '@testing-library/react';
import Games from '../pages/games';
import axios from 'axios';

jest.mock('axios');

describe('Games Page', () => {
  it('displays a list of games', async () => {
    const mockGames = [
      { _id: '1', name: 'Game1', creator: { displayName: 'User1' }, settings: { difficulty: 'easy' } },
      { _id: '2', name: 'Game2', creator: { displayName: 'User2' }, settings: { difficulty: 'hard' } }
    ];

    axios.get.mockResolvedValueOnce({ data: mockGames });

    render(<Games />);

    expect(await screen.findByText('Game1')).toBeInTheDocument();
    expect(screen.getByText('Created by: User1')).toBeInTheDocument();
    expect(screen.getByText('Game2')).toBeInTheDocument();
    expect(screen.getByText('Created by: User2')).toBeInTheDocument();
  });
});
