const express = require('express');
const { createLobby, joinLobby, getLobby, listLobbies } = require('../services/lobbyService');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, creatorId, maxUsers } = req.body;
    const lobby = await createLobby(name, creatorId, maxUsers);
    res.status(200).json(lobby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/join', async (req, res) => {
  try {
    const { userId, code } = req.body;
    const lobby = await joinLobby(userId, code);
    res.status(200).json(lobby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const lobby = await getLobby(req.params.id);
    res.status(200).json(lobby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const lobbies = await listLobbies();
    res.status(200).json(lobbies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.export
