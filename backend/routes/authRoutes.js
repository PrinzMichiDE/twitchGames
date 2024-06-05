const express = require('express');
const { loginWithTwitch } = require('../services/authService');
const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { twitchProfile } = req.body;
    const result = await loginWithTwitch(twitchProfile);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
