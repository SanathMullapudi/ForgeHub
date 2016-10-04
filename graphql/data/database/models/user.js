import mongoose, {Schema} from 'mongoose';
import jwt from 'jwt-simple';
const JWT_SECRET = process.env.JWT_SECRET;

const userSchema = Schema({
  screenName: { type: String, default: ''},
  pic: String,
  href: String,
  videos: [{type: String, ref: 'Video', default: []}],
});

userSchema.methods.fetch = function (prop) {
  return this.populate({path: prop}).execPopulate().then(value => value[prop]);
};

userSchema.methods.addVideos = function (newVideosIds) {
  const deDupedVids = newVideosIds.filter(id => !this.videos.includes(id));
  this.videos = this.videos.concat(deDupedVids);
  return this.save();
};

userSchema.methods.getToken = function () {
  return jwt.encode({id: this.id}, JWT_SECRET);
};

// Pseudo authetication, but the place where real auth could happen
userSchema.statics.login = async (username, pass) => {
  if (username !== pass) return new Error('Invalid Username & password combination');
  const user = await User.findOne({href: `http://forge.gg/${username}`});
  return {token: user.getToken(), name: user.name, pic: user.pic};
};

userSchema.virtual('name').get(function () {
  return this.screenName || this.href.slice(16);
});

userSchema.virtual('name').set(function (newName) {
  return this.screenName = newName;
});

export default User = mongoose.model('User', userSchema);
