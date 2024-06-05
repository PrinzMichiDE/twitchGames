const { expect } = require('chai');
const { createOverlay, getOverlay, listOverlays } = require('../services/overlayService');
const mongoose = require('mongoose');
const User = require('../models/User');
const Overlay = require('../models/Overlay');

describe('Overlay Service', () => {
  let creatorId;

  before(async () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const user = new User({ twitchId: '12345', displayName: 'TestUser' });
    await user.save();
    creatorId = user._id;
  });

  after(async () => {
    await User.deleteMany({});
    await Overlay.deleteMany({});
    mongoose.connection.close();
  });

  it('should create an overlay', async () => {
    const components = [{ type: 'video', url: 'http://example.com/video.mp4' }];
    const overlay = await createOverlay('TestOverlay', creatorId, components);
    expect(overlay).to.have.property('name', 'TestOverlay');
    expect(overlay).to.have.property('creator').eql(creatorId);
  });

  it('should get an overlay', async () => {
    const components = [{ type: 'video', url: 'http://example.com/video.mp4' }];
    const overlay = await createOverlay('TestOverlay', creatorId, components);
    const result = await getOverlay(overlay._id);
    expect(result).to.have.property('name', 'TestOverlay');
  });

  it('should list overlays', async () => {
    const components = [{ type: 'video', url: 'http://example.com/video.mp4' }];
    await createOverlay('TestOverlay1', creatorId, components);
    await createOverlay('TestOverlay2', creatorId, components);
    const overlays = await listOverlays();
    expect(overlays).to.have.lengthOf(2);
  });
});
