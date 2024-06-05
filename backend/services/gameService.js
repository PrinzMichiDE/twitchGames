const Game = require('../models/Game');

const createGame = async (name, creatorId, settings) => {
  const game = new Game({ name, creator: creatorId, settings });
  await game.save();
  return game;
};

const getGame = async (id) => {
  const game = await Game.findById(id).populate('creator', 'displayName');
  if (!game) throw new Error('Game not found');
  return game;
};

const listGames = async () => {
  return await Game.find().populate('creator', 'displayName');
};

module.exports = { createGame, getGame, listGames };
