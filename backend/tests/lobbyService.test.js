const { expect } = require('chai');
const { createLobby, joinLobby, getLobby, listLobbies } = require('../services/lobbyService');
const mongoose = require('mongoose');
const User = require('../models/User');
const Lobby = require('../models/Lobby');

describe('Lobby Service', () => {
  let creatorId, userId;

  before(async () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const creator = new User({ twitchId: '12345', displayName: 'CreatorUser' });
    await creator.save();
    creatorId = creator._id;
    const user = new User({ twitchId: '67890', displayName: 'TestUser' });
    await user.save();
    userId = user._id;
  });

  after(async () => {
    await User.deleteMany({});
    await Lobby.deleteMany({});
    mongoose.connection.close();
  });

  it('should create a lobby', async () => {
    const lobby = await createLobby('TestLobby', creatorId, 5);
    expect(lobby).to.have.property('name', 'TestLobby');
    expect(lobby).to.have.property('creator').eql(creatorId);
  });

  it('should join a lobby', async () => {
    const lobby = await createLobby('TestLobby', creatorId, 5);
    const updatedLobby = await joinLobby(userId, lobby.code);
    expect(updatedLobby.users).to.include(userId);
  });

  it('should get a lobby', async () => {
    const lobby = await createLobby('TestLobby', creatorId, 5);
    const result = await getLobby(lobby._id);
    expect(result).to.have.property('name', 'TestLobby');
  });

  it('should list lobbies', async () => {
    await createLobby('TestLobby1', creatorId, 5);
    await createLobby('TestLobby2', creatorId, 5);
    const lobbies = await listLobbies();
    expect(lobbies).to.have.lengthOf(2);
  });
});
