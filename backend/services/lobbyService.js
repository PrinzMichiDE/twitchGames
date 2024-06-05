const Lobby = require('../models/Lobby');
const User = require('../models/User');
const { nanoid } = require('nanoid');

const createLobby = async (name, creatorId, maxUsers) => {
  const code = nanoid(6);
  const lobby = new Lobby({ name, creator: creatorId, maxUsers, code });
  await lobby.save();
  return lobby;
};

const joinLobby = async (userId, code) => {
  const lobby = await Lobby.findOne({ code }).populate('users', 'displayName');
  if (!lobby) throw new Error('Lobby not found');
  if (lobby.users.length >= lobby.maxUsers) throw new Error('Lobby is full');
  lobby.users.push(userId);
  await lobby.save();
  return lobby;
};

const getLobby = async (id) => {
  const lobby = await Lobby.findById(id).populate('creator', 'displayName').populate('users', 'displayName');
  if (!lobby) throw new Error('Lobby not found');
  return lobby;
};

const listLobbies = async () => {
  return await Lobby.find().populate('creator', 'displayName');
};

module.exports = { createLobby, joinLobby, getLobby, listLobbies };
