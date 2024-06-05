import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  twitchId: {
    type: String,
    required: true,
    unique: true,
  },
  login: String,
  displayName: String,
  profileImageUrl: String,
});

const User = mongoose.model('User', UserSchema);

export default User;
