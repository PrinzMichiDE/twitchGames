import axios from 'axios';
import User from '../models/User.js';

export default async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:3000/auth/callback',
      },
    });

    const { access_token } = tokenResponse.data;

    const userResponse = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Client-Id': process.env.TWITCH_CLIENT_ID,
      },
    });

    const user = userResponse.data.data[0];

    let existingUser = await User.findOne({ twitchId: user.id });
    if (!existingUser) {
      existingUser = new User({
        twitchId: user.id,
        login: user.login,
        displayName: user.display_name,
        profileImageUrl: user.profile_image_url,
      });
      await existingUser.save();
    }

    res.json({ user: existingUser, token: access_token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
