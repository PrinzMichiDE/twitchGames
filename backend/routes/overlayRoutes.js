const express = require('express');
const { createOverlay, getOverlay, listOverlays } = require('../services/overlayService');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, creatorId, components } = req.body;
    const overlay = await createOverlay(name, creatorId, components);
    res.status(200).json(overlay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const overlay = await getOverlay(req.params.id);
    res.status(200).json(overlay);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const overlays = await listOverlays();
    res.status(200).json(overlays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
