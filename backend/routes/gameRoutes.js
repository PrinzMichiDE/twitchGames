const express = require('express');
const { createGame, getGame, listGames } = require('../services/gameService');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, creatorId, settings } = req.body;
    const game = await createGame(name, creatorId, settings);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await getGame(req.params.id);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const games = await listGames();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
