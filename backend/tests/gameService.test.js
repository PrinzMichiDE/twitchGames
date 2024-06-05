const { expect } = require('chai');
const { createGame, getGame, listGames } = require('../services/gameService');
const mongoose = require('mongoose');
const User = require('../models/User');
const Game = require('../models/Game');

describe('Game Service', () => {
  let creatorId;

  before(async () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const user = new User({ twitchId: '12345', displayName: 'TestUser' });
    await user.save();
    creatorId = user._id;
  });

  after(async () => {
    await User.deleteMany({});
    await Game.deleteMany({});
    mongoose.connection.close();
  });

  it('should create a game', async () => {
    const settings = { difficulty: 'easy', maxPlayers: '4' };
    const game = await createGame('TestGame', creatorId, settings);
    expect(game).to.have.property('name', 'TestGame');
    expect(game).to.have.property('creator').eql(creatorId);
    expect(game.settings.get('difficulty')).to.equal('easy');
  });

  it('should get a game', async () => {
    const settings = { difficulty: 'medium', maxPlayers: '4' };
    const game = await createGame('TestGame', creatorId, settings);
    const result = await getGame(game._id);
    expect(result).to.have.property('name', 'TestGame');
  });

  it('should list games', async () => {
    const settings = { difficulty: 'hard', maxPlayers: '4' };
    await createGame('TestGame1', creatorId, settings);
    await createGame('TestGame2', creatorId, settings);
    const games = await listGames();
    expect(games).to.have.lengthOf(2);
  });
});
