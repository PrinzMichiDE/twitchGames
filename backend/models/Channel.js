// backend/models/Channel.js
const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
  broadcaster_id: { type: String, required: true, unique: true },
  broadcaster_name: { type: String, required: true },
  game_name: { type: String, required: true },
  title: { type: String, required: true },
  broadcaster_language: { type: String },
  tags: { type: [String] },
});

module.exports = mongoose.models.Channel || mongoose.model('Channel', ChannelSchema);