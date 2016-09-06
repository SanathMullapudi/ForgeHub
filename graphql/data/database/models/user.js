import mongoose, {Schema} from 'mongoose';

const userSchema = Schema({
  name: String,
  pic: String,
  href: String,
  videos: [{type: Schema.Types.ObjectId, ref: 'Video', default: []}],
});

userSchema.methods.addVideos = function (newVideos) {
  this.videos = this.videos.concat(newVideos);
  return this.save();
};

export default User = mongoose.model('User', userSchema);
