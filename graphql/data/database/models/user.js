import mongoose, {Schema} from 'mongoose';

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

userSchema.virtual('name').get(function () {
  return this.screenName || this.href.slice(16);
});

userSchema.virtual('name').set(function (newName) {
  return this.screenName = newName;
});

export default User = mongoose.model('User', userSchema);
