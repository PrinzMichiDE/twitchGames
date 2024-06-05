import axios from 'axios';
import { getSession } from 'next-auth/react';

export default async (req, res) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      console.error('No session found');
      res.status(401).json({ error: 'Not authenticated' });
      return;
    }

    const { accessToken, user } = session;

    if (!accessToken || !user || !user.id) {
      console.error('Invalid session data:', session);
      res.status(400).json({ error: 'Invalid session data' });
      return;
    }

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID,
    };

    const userId = user.id;

    console.log('AccessToken:', accessToken);
    console.log('User ID:', userId);

    const getData = async (url, params = {}) => {
      try {
        const response = await axios.get(url, { headers, params });
        console.log(`Response from ${url}:`, response.data);
        return response.data;
      } catch (error) {
        console.error(`Error fetching ${url}:`, error.response ? error.response.data : error.message);
        return null;
      }
    };

    const userDetails = await getData(`https://api.twitch.tv/helix/users`, { id: userId });
    const channelDetails = await getData(`https://api.twitch.tv/helix/channels`, { broadcaster_id: userId });
    const subscriptions = await getData(`https://api.twitch.tv/helix/subscriptions`, { broadcaster_id: userId });
    const followers = await getData(`https://api.twitch.tv/helix/channels/followers`, { broadcaster_id: userId });
    const bitsLeaderboard = await getData(`https://api.twitch.tv/helix/bits/leaderboard`);
    const analyticsExtensions = await getData(`https://api.twitch.tv/helix/analytics/extensions`);
    const analyticsGames = await getData(`https://api.twitch.tv/helix/analytics/games`);

    const userDetailsData = userDetails ? userDetails.data[0] : {};
    const channelDetailsData = channelDetails ? channelDetails.data[0] : {};
    const subscriptionsData = subscriptions ? subscriptions.data : [];
    const followersData = followers ? followers.total : 0;
    const bitsLeaderboardData = bitsLeaderboard ? bitsLeaderboard.data : [];
    const analyticsExtensionsData = analyticsExtensions ? analyticsExtensions.data : [];
    const analyticsGamesData = analyticsGames ? analyticsGames.data : [];

    res.status(200).json({
      user: userDetailsData,
      channel: channelDetailsData,
      subscriptions: subscriptionsData,
      followers: followersData,
      bitsLeaderboard: bitsLeaderboardData,
      analytics: {
        extensions: analyticsExtensionsData,
        games: analyticsGamesData,
      },
    });

  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
