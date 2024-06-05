import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import { useSession } from 'next-auth/client';

jest.mock('next-auth/client');

describe('Home Page', () => {
  it('renders sign in button when not authenticated', () => {
    useSession.mockReturnValue([null, false]);
    render(<Home />);
    expect(screen.getByText('Sign in with Twitch')).toBeInTheDocument();
  });

  it('renders welcome message when authenticated', () => {
    useSession.mockReturnValue([{ user: { name: 'TestUser' } }, false]);
    render(<Home />);
    expect(screen.getByText('Welcome, TestUser')).toBeInTheDocument();
  });
});
