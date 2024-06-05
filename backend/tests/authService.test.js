const { expect } = require('chai');
const { loginWithTwitch } = require('../services/authService');

describe('Auth Service', () => {
  it('should create a new user and return a token', async () => {
    const twitchProfile = {
      id: '12345',
      display_name: 'TestUser',
      profile_image_url: 'http://example.com/avatar.jpg'
    };
    const result = await loginWithTwitch(twitchProfile);
    expect(result).to.have.property('user');
    expect(result).to.have.property('token');
  });
});
