import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const accessToken = session.accessToken;
  const broadcasterId = session.user.id; // Use the user's id as the broadcaster_id

  try {
    // Fetch channel information to check for partner status
    const channelResponse = await axios.get('https://api.twitch.tv/helix/channels', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID
      },
      params: {
        broadcaster_id: broadcasterId
      }
    });

    console.log('Channel Response:', channelResponse.data);

    // Fetch analytics data
    const analyticsResponse = await axios.get('https://api.twitch.tv/helix/analytics/extensions', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID
      }
    });

    console.log('Analytics Response:', analyticsResponse.data);

    res.status(200).json({
      channel: channelResponse.data,
      analytics: analyticsResponse.data
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
};
