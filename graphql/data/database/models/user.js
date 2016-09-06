import mongoose, {Schema} from 'mongoose';

const userSchema = Schema({
  name: String,
  picture: String,
  videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
});

userSchema.methods.href = function () {
  return `http://forge.gg/${this.name}`;
};

gameSchema.methods.addVideos = function (newVideos) {
  this.videos.concat(newVideos);
};

export default User = mongoose.model('User', userSchema);
