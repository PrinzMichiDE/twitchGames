const Overlay = require('../models/Overlay');

const createOverlay = async (name, creatorId, components) => {
  const overlay = new Overlay({ name, creator: creatorId, components });
  await overlay.save();
  return overlay;
};

const getOverlay = async (id) => {
  const overlay = await Overlay.findById(id).populate('creator', 'displayName');
  if (!overlay) throw new Error('Overlay not found');
  return overlay;
};

const listOverlays = async () => {
  return await Overlay.find().populate('creator', 'displayName');
};

module.exports = { createOverlay, getOverlay, listOverlays };
